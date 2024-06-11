import {Metadata, useQuery} from '@redwoodjs/web'
import {selector, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import monitorPageConfigAtom, {columnState} from "src/atoms/MonitorPageConfigAtom";
import Monitor from "src/components/Monitor/Monitor";
import {eventEmitter} from "src/utils";
import {useEffect, useState} from "react";
import {Socket, io} from "socket.io-client";
import {DefaultEventsMap} from '@socket.io/component-emitter';
import {useSocket} from "src/contexts/socketContext";

const GET_MONITORS = gql`
  query GetMonitors {
    monitors {
      id
      name
      url
      type
    }
  }
`
export let monitorSocket: Socket<DefaultEventsMap, DefaultEventsMap>
const MonitorPage = () => {
  const {data, loading} = useQuery(GET_MONITORS)
  const {socket} = useSocket()
  useEffect(() => {
    socket.on('snapshot', onSnapshot)

    return () => {
      socket.off('snapshot', onSnapshot)
    }
  }, []);
  const onSnapshot = (data: { monitorId: number, hasError: boolean }) => {
    eventEmitter.emit('refresh', {monitorId: data.monitorId, hasError: data.hasError})
  }
  const columns = useRecoilValue(columnState)
  return (
    <>
      <Metadata title="Monitor" description="Monitor page"/>

      <div className={'grid gap-4 p-4'} style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}>
        {loading && <div className={'loading-infinity loading loading-lg absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'}/>}
        {!loading && data?.monitors?.map((monitor) => (
          <Monitor alt={monitor.name} key={monitor.id} id={monitor.id} src={`http://0.0.0.0:8911/monitorImage?id=${monitor.id}`} eventEmitter={eventEmitter}/>
        ))}
      </div>
    </>
  )
}

export default MonitorPage
