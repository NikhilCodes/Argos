import {Metadata, useMutation, useQuery} from '@redwoodjs/web'
import {useState} from "react";
import CreateMonitorModal from "src/components/CreateMonitorModal/CreateMonitorModal";
import {twMerge} from "tailwind-merge";
import EditMonitorDrawer from "src/components/EditMonitorDrawer/EditMonitorDrawer";
import {Monitor} from "types/graphql";

const GET_MONITORS = gql`
  query GetMonitorsExtensive {
    monitors {
      id
      name
      type
      commands
      url
      rowSpan
      colSpan
      username
      password
      WebsiteStep {
        id
        target
        action
        value
      }
    }
  }
`

const DELETE_MONITOR = gql`
  mutation DeleteMonitor($id: Int!) {
    deleteMonitor(id: $id) {
      id
    }
  }
`

const ConfigurePage = () => {
  const {data, loading, error, refetch} = useQuery(GET_MONITORS)
  const [editMonitor, setEditMonitor] = useState<Monitor | null>(null)
  const [deleteMonitor] = useMutation(DELETE_MONITOR, {
    onCompleted: () => {
      refetch()
    }
  })
  const [addMonitorModalVisible, setAddMonitorModalVisible] = useState(false)
  if (error) {
    return <div>Failed to load: {error.message}</div>
  }

  return (
    <>
      <Metadata title="Configure" description="Configure page"/>
      <CreateMonitorModal visible={addMonitorModalVisible} onClose={() => {
        setAddMonitorModalVisible(false)
        refetch()
      }}/>
      <div className={'sm:mx-auto mx-10 max-w-xl'}>
        <div
          onClick={() => {
            setAddMonitorModalVisible(true)
          }}
          className={'mt-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500 cursor-pointer transition hover:bg-gray-200 active:bg-gray-300'}
        >
          <h6 className={'text-2xl font-bold flex items-center justify-center gap-2'}>
            Add Monitor <img width={40}
                             src={'img/add-monitor.svg'}
                             alt={'add monitor'}/>
          </h6>
        </div>
        {loading ? <div className="flex mx-auto mt-20 loading loading-infinity loading-lg"></div> :
          <div className={'my-4 grid sm:grid-cols-2 mx-auto gap-4 '}>
            {data.monitors.map((monitor: Monitor) => (
              <div key={monitor.id} className={'p-5 col-span-1 border-solid border-[1px] shadow-md rounded-lg grid grid-cols-2'}>
                <div className={'flex items-center gap-2 col-span-1'}>
                  <div className={'w-[24px]'}>
                    {monitor.type === "CLI" ?
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                           fill="#939393">
                        <path
                          d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/>
                      </svg> :
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                           fill="#939393">
                        <path
                          d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
                      </svg>}
                  </div>
                  <div className={'text-sm font-bold my-0 overflow-hidden overflow-ellipsis'}>
                    {monitor.name}
                  </div>
                </div>
                <div className={'flex gap-2 items-center justify-end'}>
                  <label
                    className={'badge badge-neutral text-xs text-white cursor-pointer active:scale-105'}
                    htmlFor="edit-monitor-drawer"
                    onClick={() => {
                      setEditMonitor(monitor)
                    }}
                  >
                    Edit
                  </label>
                  <button
                    onClick={() => {
                      deleteMonitor({
                        variables: {
                          id: monitor.id
                        }
                      })
                    }}
                    className={'badge badge-error text-xs text-white cursor-pointer active:scale-105'}
                  >Delete
                  </button>
                </div>

              </div>
            ))}
          </div>}

        {/*Drawer*/}
        <EditMonitorDrawer initialMonitorData={editMonitor} onEditSuccess={refetch}/>
      </div>
    </>
  )
}

export default ConfigurePage
