import {Metadata, useMutation, useQuery} from '@redwoodjs/web'
import {selector, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import monitorPageConfigAtom, {zoomMultiplierState} from "src/atoms/MonitorPageConfigAtom";
import Monitor from "src/components/Monitor/Monitor";
import {eventEmitter} from "src/utils";
import {useEffect, useState} from "react";
import {useSocket} from "src/contexts/socketContext";
import {MuuriComponent} from "muuri-react";

const GET_MONITORS = gql`
  query GetMonitors {
    monitors {
      id
      name
      url
      type
      colSpan
      rowSpan
    }
  }
`
const UPDATE_ORDER = gql`
  mutation UpdateOrder($ids: [Int]) {
    updateMonitorsOrder(ids: $ids)
  }
`
const phPool = [];
const phElem = document.createElement('div');
const MonitorPage = () => {
  const {data, loading} = useQuery(GET_MONITORS)
  const [updateOrder] = useMutation(UPDATE_ORDER)
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
  const columns = useRecoilValue(zoomMultiplierState)

  useEffect(() => {
    // dispatch window resize event to trigger muuri layout
    window.dispatchEvent(new Event('resize'))
  }, [columns]);

  return (
    <>
      <Metadata title="Monitor" description="Monitor page"/>
      {loading && <div
        className={'loading-infinity loading loading-lg absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2'}/>}
      <div className={'px-4'}>
        <MuuriComponent
          dragEnabled={true}
          instantLayout={true}
          dragPlaceholder={{
            enabled: true,
          }}
          onDragEnd={(async item => {
            const monitorIds = item.getGrid().getItems().map(v => parseInt(v.getKey() as string))
            console.log(monitorIds)
            await updateOrder({variables: {ids: monitorIds}})
          })}
        >
          {!loading && data?.monitors?.map((monitor) => (
            <Monitor
              alt={monitor.name}
              key={monitor.id}
              id={monitor.id}
              size={{width: monitor.colSpan * columns, height: monitor.rowSpan * columns}}
              src={`${process.env.REDWOOD_ENV_API_URL}/monitorImage?id=${monitor.id}`}
              eventEmitter={eventEmitter}
            />
          ))}
        </MuuriComponent>
      </div>
    </>
  )
}

export default MonitorPage
