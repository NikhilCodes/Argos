import {atom} from "recoil";

export interface Socket {
  connected: boolean
  socket?: any
}

const socketAtom = atom<Socket>({
  key: 'socket',
  default: {
    connected: false,
  },
})

export default socketAtom
