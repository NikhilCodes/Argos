import type {APIGatewayEvent, Context} from 'aws-lambda'

import {logger} from 'src/lib/logger'
import {getSocketIO, startSocketServer} from "src/services/backgroundTasks/socket";
import fs from "node:fs";
import {db} from "src/lib/db";
import cron from "node-cron";
import puppeteer, {Browser, BrowserContext, Page} from 'puppeteer';
import {WebsiteStep} from "types/graphql";
import {Server, Socket} from "socket.io";

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } _context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info(`${event.httpMethod} ${event.path}: background function`)

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: 'background function',
    }),
  }
}

function debounce(func, wait, maxWait) {
  let timeout: string | number | NodeJS.Timeout, lastCallTime: number

  return function (...args) {
    const now = Date.now()
    const context = this

    if (!lastCallTime) {
      lastCallTime = now
    }

    const timeSinceLastCall = now - lastCallTime

    clearTimeout(timeout)

    if (timeSinceLastCall >= maxWait) {
      func.apply(context, args)
      lastCallTime = now
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
        lastCallTime = Date.now()
      }, wait)
    }
  }
}
let io: Server
let webMonitors = []
let monitorPages: {
  [key: string]: Page
} = {}
async function puppeteerJob() {
  fs.mkdirSync('./screenshots', {recursive: true})

  const browser = await puppeteer.launch({
    headless: 'shell',
    defaultViewport: {
      width: 1500,
      height: 750,
    },
  })

  io = getSocketIO()
  io.on('connection', (socket) => {
    socket.on('refresh', () => {
      console.log('Refreshing')

      webMonitors = []
      monitorPages = {}
      browser.pages().then((pages) => {
        return Promise.all(pages.map((page) => {
          if (!page.isClosed()) {
            page.close()
          }
        }))
      }).then(async () => {
        await puppeteerJobCore(browser)
      })
    })
  })
  await puppeteerJobCore(browser)
}

async function puppeteerJobCore(browser: Browser) {
  webMonitors = await db.monitor.findMany({
    where: {type: 'WEB'},
  })
  // Open tabs for each monitor
  for (const monitor of webMonitors) {
    const page = await browser.newPage()
    monitorPages[monitor.id] = page
    try {
      await page.goto(monitor.url, {
        waitUntil: ['domcontentloaded', 'load'],
      })

      async function screenshot() {
        if (page.isClosed()) {
          return
        }
        try {
          await _safeScreenshot(page, monitor.id)
        } catch (e) {
          logger.error('Failed to take screenshot', e)
        }
        io.emit('snapshot', {monitorId: monitor.id, hasError: false})
      }
      const debouncedScreenshot = debounce(screenshot, 2000, 10000)
      await page.exposeFunction('screenshot', debouncedScreenshot)
      await page.evaluate(() => {
        const observer = new MutationObserver((mutations) => {
          window['screenshot']()
        })

        observer.observe(document, {
          // attributes: true,
          childList: true,
          subtree: true,
          characterData: true,
        })
      })
      execStepsOnPageSequentially(page, monitor.id, 2).then(screenshot).catch((e) => {
        io.emit('snapshot', {monitorId: monitor.id, hasError: true})
        failedMonitors[monitor.id] = true
        logger.error(`Failed to open monitor ${monitor.name} - ${monitor.id} - ${e.message}`)
      })
      delete failedMonitors[monitor.id]
    } catch (e) {
      io.emit('snapshot', {monitorId: monitor.id, hasError: true})
      failedMonitors[monitor.id] = true
      logger.error(`Failed to open monitor ${monitor.name} - ${monitor.id} - ${e}`)
    }
  }
}

const failedMonitors = {}

function puppeteerFailureRetry() {
  cron.schedule('*/2 * * * *', async () => {
    await Promise.all(Object.keys(failedMonitors).map(async (monitorId) => {
      const page = monitorPages[monitorId]
      logger.info('Checking failed monitor', monitorId)
      if (!page) {
        return
      }

      try {
        if (!failedMonitors[monitorId]) {
          return;
        }
        const monitor = webMonitors.find((m) => m.id === parseInt(monitorId))
        await page.goto(monitor.url, {
          waitUntil: ['domcontentloaded', 'load'],
        })
        execStepsOnPageSequentially(page, monitor.steps, 2).then(async () => {
          if (page.isClosed()) {
            return
          }
          await _safeScreenshot(page, monitor.id)
          io.emit('snapshot', {monitorId: monitor.id, hasError: false})
          delete failedMonitors[monitor.id]
        }).catch((e) => {
          io.emit('snapshot', {monitorId: monitor.id, hasError: true})
          failedMonitors[monitor.id] = true
          logger.error(`Failed to open monitor ${monitor.name} - ${monitor.id} - ${e.message}`)
        })
      } catch (e) {
        logger.error('Failed to retry monitor '+ monitorId)
      }
    }))
  })
}

async function _safeScreenshot(page: Page, name: string | number) {
  if (page.isClosed()) {
    return
  }
  await page.screenshot({
    path: `./screenshots/${name}.webp`,
    type: 'webp',
  })
}

function puppeteerRefresh() {
  cron.schedule('*/10 * * * *', async () => {
    await Promise.all(webMonitors.map(async (monitor) => {
      const page = monitorPages[monitor.id]
      if (!page) {
        return
      }

      try {
        await page.reload({
          waitUntil: ['domcontentloaded', 'load'],
        })
        await _safeScreenshot(page, monitor.id)
        io.emit('snapshot', {monitorId: monitor.id, hasError: false})
      } catch (e) {
        io.emit('snapshot', {monitorId: monitor.id, hasError: true})
        failedMonitors[monitor.id] = true
        logger.error(`Failed to open monitor ${monitor.name} - ${monitor.id} - ${e}`)
      }
    }))
  })
}

function sleep(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec*1000))
}

async function execStepsOnPageSequentially(page: Page, monitorsId: number, sleepBetweenSteps: number = 2) {
  const steps = await db.websiteStep.findMany({
    where: {monitorsId: monitorsId},
    orderBy: {createdAt: 'asc'},
  })
  for (const step of steps??[]) {
    switch (step.action) {
      case 'CLICK':
        await page.click(step.target)
        break
      case 'WAIT':
        if (step.value) {
          await sleep(+step.value)
        }
        break
      case 'TYPE':
        await page.type(step.target, step.value)
        break
      case 'NAVIGATE':
        await page.goto(step.target)
        break
      default:
        break
    }
    await sleep(sleepBetweenSteps)
  }

  await sleep(sleepBetweenSteps)
}

startSocketServer()
puppeteerRefresh()
puppeteerFailureRetry()
puppeteerJob().then()

