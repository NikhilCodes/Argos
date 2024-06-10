import {atom, selector} from "recoil";
import {recoilPersist} from 'recoil-persist'
import {MIN_COLUMNS} from "src/constants";

const {persistAtom} = recoilPersist({
  key: 'monitorPageConfig',
  storage: localStorage,
})

export interface MonitorPageConfig {
  columns: number
}

const monitorPageConfigAtom = atom<MonitorPageConfig>({
  key: 'monitorPageConfig',
  default: {
    columns: MIN_COLUMNS
  },
  effects: [
    persistAtom
  ]
})

export const columnState = selector({
  key: 'columnState',
  get: ({get}) => {
    return get(monitorPageConfigAtom).columns
  },
})

export default monitorPageConfigAtom

