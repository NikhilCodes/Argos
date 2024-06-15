import { createServer } from '@redwoodjs/api-server'

import { logger } from 'src/lib/logger'
import {Server} from "socket.io";
let io: Server
async function main() {
  const server = await createServer({
    logger,
  })

  // Socket server
  io = new Server(server.server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  await server.start()
}

export const getSocketIO = () => {
  return io
}

main()
