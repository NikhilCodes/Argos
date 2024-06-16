import {APP_NAME} from "src/constants";
import IconButton from "src/components/IconButton/IconButton";
import {navigate, routes} from "@redwoodjs/router";
import MonitorViewConfigureModal from "src/components/MonitorViewConfigureModal/MonitorViewConfigureModal";
import {useState} from "react";
import {twMerge} from "tailwind-merge";
import {useSocket} from "src/contexts/socketContext";
import {toast} from "@redwoodjs/web/toast";

const Header = () => {
  const {socket, connected} = useSocket()
  const [configureMonitorViewModalVisible, setConfigureMonitorViewModalVisible] = useState(false)
  return (
    <header
      className={'px-6 py-4 flex items-center justify-between bg-white'}
    >
      <h2 className={'my-0 flex items-center gap-1 cursor-pointer'} onClick={() => navigate(routes.home())}>
        {APP_NAME}
        <div className={'flex gap-1'}>
          <div className={'text-xs rounded-full px-2 py-0.5 bg-emerald-500 text-white'}>{process.env.REDWOOD_ENV_RELEASE_CYCLE}</div>
        </div>
      </h2>

      <div className={'flex gap-2 items-center relative'}>
        <div className={'w-20'}/>
        <div
          className={twMerge('hidden sm:flex items-center left-0 absolute text-xs rounded-full px-2 py-0.5 border-1 border-solid border-emerald-500 text-black transition', !connected && 'opacity-0 translate-y-5')}
        >
          <div className={'me-1 inline-flex h-2 w-2 rounded-full bg-emerald-500 opacity-75'}/>
          Online
        </div>
        <div
          className={twMerge('hidden sm:flex items-center absolute text-xs rounded-full px-2 py-0.5 border-1 border-solid border-red-700 text-black transition', connected && 'opacity-0 -translate-y-5')}
        >
          <div className={'me-1 inline-flex h-2 w-2 rounded-full bg-red-700 opacity-75'}/>
          Offline
        </div>
        <IconButton icon={'img/refresh.svg'} onClick={() => {
          socket?.emit('refresh')
          toast.loading('Refreshing all monitors', {
            duration: 3000,
          })
        }}/>
        <IconButton icon={'img/arrange.svg'} onClick={() => setConfigureMonitorViewModalVisible(true)}/>
        <IconButton className={'hidden sm:flex'} icon={'img/kiosk.svg'} onClick={() => {
          document.getElementById('app').requestFullscreen().then()
        }}/>
      </div>
      <MonitorViewConfigureModal visible={configureMonitorViewModalVisible}
                                 onClose={() => setConfigureMonitorViewModalVisible(false)}/>
    </header>
  )
}

export default Header
