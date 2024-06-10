import {createServer} from 'http'
import {Server} from 'socket.io'
import * as http from "node:http";
let io

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
  const SOCKET_PORT = 8912
  httpServer.listen(SOCKET_PORT, () => {
    console.log('Socket server started at http://localhost:' + SOCKET_PORT)
  }).on('error', (err) => {
    console.error(err)
  })
}
export const getSocketIO = () => {
  return io
}
