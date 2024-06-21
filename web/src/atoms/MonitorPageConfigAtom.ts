import {atom, selector} from "recoil";
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
  key: 'monitorPageConfig',
  storage: localStorage,
})

export interface MonitorPageConfig {
  zoomMultiplier: number
}

const monitorPageConfigAtom = atom<MonitorPageConfig>({
  key: 'monitorPageConfig',
  default: {
    zoomMultiplier: 4,
  },
  effects: [
    persistAtom
  ]
})

export const zoomMultiplierState = selector({
  key: 'zoomMultiplierState',
  get: ({get}) => {
    return get(monitorPageConfigAtom).zoomMultiplier
  },
})

export default monitorPageConfigAtom

