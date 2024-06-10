export class EventEmitter {
  private readonly callbacks: Record<any, any>
  constructor () {
    this.callbacks = {}
  }

  on (event: string, cb: any) {
    if (this.callbacks[event] === undefined) {
      this.callbacks[event] = []
    }
    this.callbacks[event].push(cb)
  }

  off (event: string, cb: any) {
    const cbs = this.callbacks[event]
    if (cbs !== null) {
      this.callbacks[event] = cbs.filter((fn: any) => fn !== cb)
    }
  }

  emit (event: string, data?: any) {
    const cbs = this.callbacks[event]
    if (cbs !== null) {
      cbs?.forEach((cb: (d: any) => void) => { cb(data) })
    }
  }
}

export const eventEmitter = new EventEmitter()
