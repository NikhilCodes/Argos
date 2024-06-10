// // To access your database
// // Append api/* to import from api and web/* to import from web
// import {db} from 'api/src/lib/db'
// import puppeteer from 'puppeteer'
// import * as fs from "node:fs";
// import {getSocketIO} from "api/src/services/backgroundTasks/socket";
//
// function debounce(func, wait) {
//   let timeout
//   return function (...args) {
//     clearTimeout(timeout)
//     timeout = setTimeout(() => func.apply(this, args), wait)
//   }
// }
//
// export default async ({_args}) => {
//   fs.mkdirSync('./screenshots', {recursive: true})
//   const io = getSocketIO()
//   const browser = await puppeteer.launch({
//     headless: false,
//   })
//   const webMonitors = await db.monitor.findMany({
//     where: {type: 'WEB'},
//   })
//   console.log(webMonitors)
//   const monitorPages = {}
//   // Open tabs for each monitor
//   for (const monitor of webMonitors) {
//     const page = await browser.newPage()
//     monitorPages[monitor.id] = page
//     await page.goto(monitor.url)
//
//     async function screenshot() {
//       await page.screenshot({
//         path: `./screenshots/${monitor.id}.png`,
//       })
//       io.emit('snapshot', { monitorId: monitor.id })
//     }
//
//     const debouncedScreenshot = debounce(screenshot, 2000)
//     await screenshot()
//
//     await page.exposeFunction('screenshot', debouncedScreenshot)
//     await page.evaluate(() => {
//       const observer = new MutationObserver((mutations) => {
//         window['screenshot']()
//       })
//
//       observer.observe(document, {
//         attributes: true,
//         childList: true,
//         subtree: true,
//         characterData: true,
//       })
//     })
//   }
// }
