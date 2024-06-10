import {io, Socket} from "socket.io-client";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";

const socket = io(process.env.REDWOOD_ENV_SOCKET_URL, {
  path: '/socket.io',
  autoConnect: true,
  reconnection: true,
})
export const SocketContext = createContext<{ socket: Socket, connected: boolean }>({
  socket,
  connected: false,
});

export function SocketProvider(props: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  useEffect(() => {
    socket.on('connect', () => {
      setConnected(true)
    })
    socket.on('disconnect', () => {
      setConnected(false)
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, []);
  return (
    <SocketContext.Provider value={{socket, connected}}>
      {props.children}
    </SocketContext.Provider>
  )
}

// create custom hook for fetching socket
export const useSocket = () => {
  return useContext(SocketContext)
}
