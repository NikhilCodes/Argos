import {EventEmitter} from "src/utils";
import {useEffect, useState} from "react";
import {getResponsiveStyle, getStaticStyle, useDrag, useGrid} from "muuri-react";
import {useRecoilState, useRecoilValue} from "recoil";
import {zoomMultiplierState} from "src/atoms/MonitorPageConfigAtom";

interface MonitorProps {
  id: number
  src: string
  alt?: string
  eventEmitter: EventEmitter
  size: { width: number, height: number }
}

const Monitor = (props: MonitorProps) => {
  const [animating, setAnimating] = useState(false)
  const [removeOld, setRemoveOld] = useState(false)
  const [refreshKey, setRefreshKey] = useState(Math.random())
  const [refreshKeySecondary, setRefreshKeySecondary] = useState(Math.random())
  const [error, setError] = useState(false)
  useEffect(() => {
    const cb = (payload: { monitorId: number, hasError: boolean }) => {
      if (props.id == payload.monitorId) {
        if (payload.hasError) {
          setError(true)
          return
        }

        setError(false)
        setRefreshKey(Math.random())
        setAnimating(true)
        setTimeout(() => {
          setRemoveOld(true)
          setRefreshKeySecondary(Math.random())
        }, 1000)
        setTimeout(() => {
          setAnimating(false)
          setRemoveOld(false)
        }, 2000)
      }
    }

    props.eventEmitter.on('refresh', cb)
  }, [])

  return (
    <div className={'item hover:z-40'} style={{
      height: `${props.size.height/20 * 50}vw`,
      width: `${(props.size.width/20) * 50 * 1.7}vw`,
    }}>
      <div
        className={'item-content relative rounded-md overflow-hidden shadow-lg transition border-solid hover:shadow-2xl hover:scale-105 duration-300 ease-in-out'}>
        <div>
          <div
            className={'w-full h-full bg-black absolute z-10 transition-opacity ' + (error ? 'opacity-60' : 'opacity-0')}/>
          <div
            className={'absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white scale-150 transition-opacity duration-1000 ' +
              (error ? 'opacity-100' : 'opacity-0')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                 className="bi bi-cloud-slash" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                    d="M3.112 5.112a3.125 3.125 0 0 0-.17.613C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13H11l-1-1H3.781C2.231 12 1 10.785 1 9.318c0-1.365 1.064-2.513 2.46-2.666l.446-.05v-.447c0-.075.006-.152.018-.231l-.812-.812zm2.55-1.45-.725-.725A5.512 5.512 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773a3.2 3.2 0 0 1-1.516 2.711l-.733-.733C14.498 11.378 15 10.626 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3c-.875 0-1.678.26-2.339.661z"/>
              <path d="m13.646 14.354-12-12 .708-.708 12 12-.707.707z"/>
            </svg>
          </div>
        </div>
        {!removeOld && <img
          src={`${props.src}&${refreshKeySecondary}`} alt={props.alt}
          className={'absolute old-img transition-all duration-700 object-cover w-full h-full' + (error ? 'blur-sm ' : '') + (animating ? 'transition-transform duration-1000 ease-out transform -translate-y-full' : '')}
        />}
        <img src={`${props.src}&${refreshKey}`} alt={props.alt} className={'new-img object-cover w-full h-full'}/>
      </div>
    </div>
  )
}

export default Monitor
