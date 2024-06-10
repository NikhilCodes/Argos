import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import {getSocketIO, startSocketServer} from "src/services/backgroundTasks/socket";
import fs from "node:fs";
import puppeteer from "puppeteer";
import {db} from "src/lib/db";

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
  let timeout, lastCallTime

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


async function puppeteerJob() {
  fs.mkdirSync('./screenshots', {recursive: true})
  const io = getSocketIO()
  const browser = await puppeteer.launch({
    headless: 'shell',
    defaultViewport: {
      width: 1500,
      height: 750,
    },
  })
  const webMonitors = await db.monitor.findMany({
    where: {type: 'WEB'},
  })
  const monitorPages = {}
  // Open tabs for each monitor
  for (const monitor of webMonitors) {
    const page = await browser.newPage()
    monitorPages[monitor.id] = page
    await page.goto(monitor.url)

    async function screenshot() {
      await page.screenshot({
        path: `./screenshots/${monitor.id}.png`,
      })
      io.emit('snapshot', { monitorId: monitor.id })
    }

    const debouncedScreenshot = debounce(screenshot, 2000, 10000)
    await screenshot()

    await page.exposeFunction('screenshot', debouncedScreenshot)
    await page.evaluate(() => {
      const observer = new MutationObserver((mutations) => {
        window['screenshot']()
      })

      observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true,
      })
    })
  }
}

startSocketServer()
puppeteerJob().then()

