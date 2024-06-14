import {EventEmitter} from "src/utils";
import {useEffect, useState} from "react";
import {MAX_OUTPUT_SHELL} from "src/constants";

interface MonitorProps {
  id: number
  eventEmitter: EventEmitter
  size: { width: number, height: number }
}

const ShellMonitor = (props: MonitorProps) => {
  const [outputs, setOutputs] = useState<string>("")
  useEffect(() => {
    const cb = (payload) => {
      if (props.id == payload.monitorId) {
        setOutputs((prev) => (payload.output + '\n' + prev).substring(0, MAX_OUTPUT_SHELL))
      }
    }

    props.eventEmitter.on('output', cb)
  }, [])

  return (
    <div className={'item hover:z-40'} style={{
      height: `${props.size.height / 20 * 50}vw`,
      width: `${(props.size.width / 20) * 50 * 1.7}vw`,
      fontSize: `${props.size.width / 16}vw`,
    }}>
      <div
        className={'item-content border-black whitespace-pre-wrap relative bg-black text-white rounded-md overflow-hidden shadow-lg transition border-solid hover:shadow-2xl hover:scale-105 duration-300 ease-in-out'}
      >
        <div className={'p-2'}>
          {outputs}
        </div>
      </div>
    </div>
  )
}

export default ShellMonitor
