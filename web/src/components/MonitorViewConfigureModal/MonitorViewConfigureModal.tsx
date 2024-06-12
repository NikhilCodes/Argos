import Monitor from "src/components/Monitor/Monitor";
import {twMerge} from "tailwind-merge";
import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {EventEmitter} from "src/utils";
import {MAX_ZOOM, MIN_ZOOM} from "src/constants";
import {useRecoilState} from "recoil";
import monitorPageConfigAtom from "src/atoms/MonitorPageConfigAtom";

interface MonitorViewConfigureModalProps {
  visible: boolean
  onClose?: () => void
}

const MonitorViewConfigureModal = (props: MonitorViewConfigureModalProps) => {
  const ref = useRef<HTMLDialogElement>(null)

  const [config, setConfig] = useRecoilState(monitorPageConfigAtom)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    props.visible ? ref.current?.showModal() : ref.current?.close()
  }, [props.visible])

  const handleClose = () => {
    if (ref.current) {
      ref.current.close()
      props.onClose?.()
    }
  }
  const handleEsc = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    handleClose()
  }
  return (
    <dialog className={"modal"} onCancel={handleEsc} ref={ref}>
      <div className="modal-box p-10">
        <h3 className={'mt-0'}>Configure</h3>
        <div className={'text-sm'}>
          <div className={twMerge("block", "mt-4")}>
            <div className={'flex justify-between'}>
              <span className="text-gray-700 inline-flex flex-wrap items-end">Zoom multiplier</span>
              <span className="text-gray-700 font-bold text-xl">{config.zoomMultiplier}</span>
            </div>
            <div className={'w-full flex flex-col items-center mt-2'}>
              <input type="range" min={MIN_ZOOM} max={MAX_ZOOM} value={config.zoomMultiplier} onChange={(e) => {
                setConfig({
                  zoomMultiplier: e.target.valueAsNumber,
                })
              }} className="range" step={1}/>
              <div className="w-full flex justify-between text-xs px-2.5 box-border">
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
                <span>|</span>
              </div>
            </div>
          </div>

          <div className={'flex gap-2 justify-end mt-8'}>
            <button className={'btn btn-primary py-2'} onClick={handleClose}>I'm Done!</button>
          </div>
        </div>
      </div>
    </dialog>
  )
}

export default MonitorViewConfigureModal
