import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'
import fs from "node:fs";

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
  logger.info(`${event.httpMethod} ${event.path}: monitorImage function`)
  // Send image from screenshot folder
  try {
    const file = `./screenshots/${event.queryStringParameters.id}.webp`
    if (fs.existsSync(file)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/webp',
        },
        body: fs.readFileSync(`./screenshots/${event.queryStringParameters.id}.webp`, 'base64'),
        isBase64Encoded: true,
      }
    } else {
      throw new Error('File doesn\'t exist!')
    }
  } catch (e) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/webp',
      },
      body: fs.readFileSync(`./screenshots/placeholder.webp`, 'base64'),
      isBase64Encoded: true,
    }
  }
}
