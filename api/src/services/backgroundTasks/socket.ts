import {createServer} from 'http'
import {Server, Socket} from 'socket.io'
import * as http from "http";
import {logger} from "src/lib/logger";
let io: Server

export const startSocketServer = () => {
  const httpServer = createServer()
  io = new Server(httpServer, {
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
  const SOCKET_PORT = process.env.SOCKET_PORT
  httpServer.listen(SOCKET_PORT, () => {
    logger.info('Socket listening at http://localhost:' + SOCKET_PORT)
  }).on('error', (err) => {
    console.error(err)
  })
}
export const getSocketIO = () => {
  return io
}
