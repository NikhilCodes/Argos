import {APP_NAME} from "src/constants";
import IconButton from "src/components/IconButton/IconButton";
import {navigate, routes} from "@redwoodjs/router";
import MonitorViewConfigureModal from "src/components/MonitorViewConfigureModal/MonitorViewConfigureModal";
import {useState} from "react";

const Header = () => {
  const [configureMonitorViewModalVisible, setConfigureMonitorViewModalVisible] = useState(false)
  return (
    <header
      className={'px-6 py-4 flex items-center justify-between bg-white'}
    >
      <h2 className={'my-0 flex items-center gap-1 cursor-pointer'} onClick={() => navigate(routes.home())}>
        {APP_NAME}
        <div className={'flex gap-1'}>
          <div className={'text-xs rounded-full px-2 py-0.5 bg-emerald-500 text-white'}>2.0</div>
          <div className={'text-xs rounded-full px-2 py-0.5 bg-cyan-400 text-white'}>dev</div>
        </div>
      </h2>

      <div className={'flex gap-2'}>
        <IconButton icon={'img/arrange.svg'} onClick={() => setConfigureMonitorViewModalVisible(true)}/>
        <IconButton icon={'img/kiosk.svg'} onClick={() => {
          document.getElementById('app').requestFullscreen().then()
        }} />
      </div>
      <MonitorViewConfigureModal visible={configureMonitorViewModalVisible} onClose={() => setConfigureMonitorViewModalVisible(false)}/>
    </header>
  )
}

export default Header
