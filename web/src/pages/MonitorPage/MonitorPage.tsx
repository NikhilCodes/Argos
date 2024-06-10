import {Metadata, useQuery} from '@redwoodjs/web'
import {selector, useRecoilValue} from "recoil";
import monitorPageConfigAtom, {columnState} from "src/atoms/MonitorPageConfigAtom";
import Monitor from "src/components/Monitor/Monitor";
import {eventEmitter} from "src/utils";
import {useEffect, useState} from "react";
import {io} from "socket.io-client";

const socket = io('http://0.0.0.0:8912', {
  path: '/socket.io',
  autoConnect: true,
  reconnection: true,
})

const GET_MONITORS = gql`
  query GetMonitors {
    monitors {
      id
      url
      type
    }
  }
`

const MonitorPage = () => {
  const {data, loading, refetch} = useQuery(GET_MONITORS)
  const [listening, setListening] = useState(false)
  useEffect(() => {
    socket.on('connect', () => {
      setListening(true)
      console.log('Connected')
    })

    socket.on('snapshot', onSnapshot)

    socket.on('disconnect', () => {
      setListening(false)
    })

    socket.on('connect_error', (err) => {
      console.error(err)
    })

    return () => {
      socket.off('snapshot', onSnapshot)
    }
  }, []);
  const onSnapshot = (data: { monitorId: any }) => {
    console.log('OnSnapshot', data)
    eventEmitter.emit('refresh', {monitorId: data.monitorId})
  }
  const columns = useRecoilValue(columnState)
  return (
    <>
      <Metadata title="Monitor" description="Monitor page"/>

      <div className={'grid gap-4 p-4'} style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}>
        {loading && <div className={'loading loading-spinner'}/>}
        {data?.monitors?.map((monitor) => (
          <Monitor key={monitor.id} id={monitor.id} src={`http://0.0.0.0:8911/monitorImage?id=${monitor.id}`} eventEmitter={eventEmitter}/>
        ))}
      </div>
    </>
  )
}

export default MonitorPage
