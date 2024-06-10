import {twMerge} from "tailwind-merge";
import {ReactNode, useEffect, useState} from "react";
import {Monitor, MonitorType} from "types/graphql";
import {useMutation} from "@redwoodjs/web";
import {toast} from "@redwoodjs/web/toast";

interface EditMonitorDrawerProps {
  initialMonitorData?: Monitor
  onEditSuccess?: () => void
}

const UPDATE_MONITOR = gql`
  mutation UpdateMonitor($id: Int!, $update: UpdateMonitorInput!) {
    updateMonitor(id: $id, input: $update) {
      id,
    }
  }
`

const CREATE_WEBSITE_STEP = gql`
  mutation CreateWebsiteStep($input: CreateWebsiteStepInput!) {
    createWebsiteStep(input: $input) {
      id
    }
  }
`

const DELETE_WEBSITE_STEP = gql`
  mutation DeleteWebsiteStep($id: Int!) {
    deleteWebsiteStep(id: $id) {
      id
    }
  }
`

const EditMonitorDrawer = (props: EditMonitorDrawerProps) => {
  const [updateMonitor] = useMutation(UPDATE_MONITOR, {
    onCompleted: () => {
      toast.success('Monitor updated!')
      props.onEditSuccess?.()
      // close the drawer
      document.getElementById('edit-monitor-drawer')?.click()
    },
    onError: () => {
      toast.error('Failed to update monitor')
    }
  })
  const [createWebsiteStep] = useMutation(CREATE_WEBSITE_STEP, {
    onError: () => {
      toast.error('Failed to add step')
    }
  })
  const [deleteWebsiteStep] = useMutation(DELETE_WEBSITE_STEP, {
    onError: () => {
      toast.error('Failed to delete step')
    },
    onCompleted: () => {
      toast.success('Step deleted')
    }
  })
  const [toBeDeletedSteps, setToBeDeletedSteps] = useState<number[]>([])
  const [monitorData, setMonitorData] = useState<Partial<Monitor>>({})

  useEffect(() => {
    if (props.initialMonitorData?.id) {
      setMonitorData({...props.initialMonitorData})
    }
  }, [props.initialMonitorData])

  const addStep = () => {
    setMonitorData({
      ...monitorData,
      WebsiteStep: [
        ...(monitorData.WebsiteStep || []),
        {
          id: 0,
          action: 'CLICK',
          target: '',
          value: '',
          createdAt: "",
          updatedAt: ""
        }
      ]
    })
  }

  const handleSave = () => {
    updateMonitor({
      variables: {
        id: monitorData.id,
        update: {
          name: monitorData.name,
          type: monitorData.type,
          commands: monitorData.type === 'CLI' ? monitorData.commands : undefined,
          url: monitorData.type === 'WEB' ? monitorData.url : undefined,
        },
      }
    }).then()
    // Create new steps
    monitorData.WebsiteStep.map((step) => {
      if (step.id === 0) {
        createWebsiteStep({
          variables: {
            input: {
              action: step.action as StepActionType,
              target: step.target,
              value: step.value,
              monitorsId: monitorData.id
            }
          }
        }).then()
      }
    })
    // Delete steps
    toBeDeletedSteps.map((stepId) => {
      deleteWebsiteStep({
        variables: {
          id: stepId
        }
      }).then()
    })
  }

  return (
    <div className="drawer drawer-end">
      <input id="edit-monitor-drawer" type="checkbox" className="drawer-toggle"/>
      <div className="drawer-side pe-0">
        <label htmlFor="edit-monitor-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu m-0 p-4 w-96 min-h-full bg-base-200 text-base-content right-0">
          {/* Sidebar content here */}
          <div className={'text-lg font-bold my-0'}>
            Edit Monitor
          </div>
          {/*Close button*/}
          <div className={'absolute right-5'}>
            <label htmlFor="edit-monitor-drawer" className={'cursor-pointer border-none'}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                   fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none"/>
                <path
                  d="M6.29 6.71a.996.996 0 0 0 0 1.41L10.59 12 6.29 16.29a.996.996 0 1 0 1.41 1.41L12 13.41l4.29 4.3a.996.996 0 1 0 1.41-1.41L13.41 12l4.3-4.29a.996.996 0 1 0-1.41-1.41L12 10.59 7.71 6.29a.996.996 0 0 0-1.41 0z"/>
              </svg>
            </label>
          </div>

          <div>
            <label className="form-control border-0 w-full">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered box-border"
                value={monitorData?.name}
                onChange={(e) => {
                  setMonitorData({...monitorData, name: e.target.value})
                }}
              />
            </label>

            <label className="form-control border-0 w-full mt-2">
              <div className="label">
                <span className="label-text">Type</span>
              </div>
              <div
                className={twMerge('join delay-300 transition')}>
                <button
                  className={twMerge('btn join-item hover:text-white btn-info', monitorData.type !== 'CLI' ? 'btn-outline' : 'text-white')}
                  onClick={() => {
                    setMonitorData({...monitorData, type: 'CLI'})
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="currentColor">
                    <path
                      d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/>
                  </svg>
                  CLI
                </button>
                <button
                  className={twMerge('btn join-item hover:text-white btn-success', monitorData.type !== 'WEB' ? 'btn-outline' : 'text-white')}
                  onClick={() => {
                    setMonitorData({...monitorData, type: 'WEB'})
                  }}
                >
                  Web
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                       fill="currentColor">
                    <path
                      d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
                  </svg>
                </button>
              </div>
            </label>

            {monitorData.type === 'CLI' ? <label className="form-control border-0 w-full mt-2">
              <div className="label">
                <span className="label-text">Commands</span>
              </div>
              <textarea
                placeholder={'example #1: ssh user@host uptime\nexample #2: tail /app/logs/error.log'}
                cols={40}
                rows={4}
                value={monitorData.commands}
                onChange={(e) => {
                  setMonitorData({...monitorData, commands: e.target.value})
                }}
                className={'textarea textarea-bordered delay-300 transition'}
              />
            </label> : null}

            {monitorData.type === 'WEB' ? <label className="form-control border-0 w-full mt-2">
              <div className="label">
                <span className="label-text">URL</span>
              </div>
              <input
                type="url"
                value={monitorData.url}
                onChange={(e) => {
                  setMonitorData({...monitorData, url: e.target.value})
                }}
                placeholder="Ex: https://nikhilcodes.in"
                className="input input-bordered box-border"/>
            </label> : null}

            <label className="form-control border-0 w-full mt-2">
              <div className="label">
                <span className="label-text">Steps</span>
              </div>
              <ul className="timeline timeline-vertical ps-0 [&>li>hr]:p-0 [&>li:first-child>.first-divider]:hidden">
                {monitorData.WebsiteStep?.map((step, index) => (
                  <Action
                    key={index}
                    type={step.action}
                    target={step.target}
                    value={step.value}
                    onChangeType={(type) => {
                      monitorData.WebsiteStep[index].action = type
                      setMonitorData({...monitorData})
                    }}
                    onChangeTarget={(target) => {
                      monitorData.WebsiteStep[index].target = target
                      setMonitorData({...monitorData})
                    }}
                    onChangeValue={(value) => {
                      monitorData.WebsiteStep[index].value = value
                      setMonitorData({...monitorData})
                    }}
                    onDelete={() => {
                      if (step.id !== 0) {
                        setToBeDeletedSteps([...toBeDeletedSteps, step.id])
                      }
                      console.log(monitorData.WebsiteStep, index)
                      const newSteps = [...monitorData.WebsiteStep]
                      newSteps.splice(index, 1)
                      monitorData.WebsiteStep = newSteps
                      setMonitorData({...monitorData})
                    }}
                  />
                ))}
                {/*<Action type={'wait'}/>*/}
                {/*<Action type={'click'}/>*/}
                {/*<Action type={'navigate'}/>*/}
                {/*<Action type={'type'}/>*/}
                <li>
                  {monitorData.WebsiteStep?.length > 0 && <hr/>}
                  <div className="timeline-middle" onClick={addStep}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="currentColor">
                      <path
                        d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                  </div>
                </li>
              </ul>
            </label>
            <div className={'mt-6 flex gap-4'}>
              <button
                onClick={() => handleSave()}
                className={'btn btn-primary w-full'}
              >Save
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  )
}

interface ActionProps {
  type?: StepActionType
  onChangeType?: (type: StepActionType) => void
  target?: string
  onChangeTarget?: (target: string) => void
  value?: string
  onChangeValue?: (value: string) => void
  onDelete?: () => void
}

function Action(props: ActionProps) {
  const [showChangeTypeMenu, setShowChangeTypeMenu] = useState(false)
  const [editingModeOn, setEditingModeOn] = useState(false)
  const types = ['CLICK', 'TYPE', 'NAVIGATE', 'WAIT']
  const typeLabels = {
    CLICK: 'CLICK',
    TYPE: 'TYPE',
    NAVIGATE: 'NAV',
    WAIT: 'WAIT'
  }
  return (
    <li>
      <div
        className={twMerge("timeline-start bg-white min-w-24", getColorByActionType('CLICK'))}
        onClick={() => {
          setShowChangeTypeMenu(!showChangeTypeMenu)
        }}
      >
        <div>
          <span className={twMerge('flex items-center justify-start gap-2 min-h-5', getColorByActionType(props.type))}>
            <StepAction type={props.type}/> {typeLabels[props.type]}
          </span>
          <ul
            className={twMerge("transition menu w-28 left-4 top-16 rounded-box absolute bg-white [&>li]:text-left [&>li>a]:px-2.5 [&>li>a]:gap-2", showChangeTypeMenu ? 'opacity-100 z-10' : 'opacity-0 -translate-y-1/3 -z-10')}>
            {types.map((type) => (
              <li key={type}>
                <a
                  onClick={() => {
                    props.onChangeType?.(type as StepActionType)
                    setShowChangeTypeMenu(false)
                  }}
                  className={getColorByActionType(type as StepActionType)}
                >
                  <StepAction type={type as StepActionType}/> {typeLabels[type]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="timeline-middle" onClick={() => props.onDelete()}>
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path
            d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
      </div>
      <div className="timeline-end bg-white overflow-hidden min-w-28 max-w-28 min-h-5">
        {!editingModeOn && <div
          onClick={() => {
            setEditingModeOn(true)
          }}
          className=" text-ellipsis whitespace-nowrap text-left text-gray-400 min-w-28"
          style={{direction: 'rtl'}}
        >
          {props.type === 'TYPE' ? <div className={'w-full'}>
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left"
                 style={{direction: 'ltr'}}>
              <bdi>
                {props.value || '<nil>'}
              </bdi>
            </div>
            <div className="divider my-0 scale-[1.29] "></div>
            <div
              className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-gray-400"
              style={{direction: 'rtl'}}>
              <bdi>
                {props.target || '<nil>'}
              </bdi>
            </div>
          </div> : <bdi>
            {{WAIT: true, NAVIGATE: true}[props.type] ? props.value : props.target || '<nil>'}
          </bdi>}
        </div>}
        <div>
          {editingModeOn && {TYPE: true, WAIT: true, NAVIGATE: true}[props.type] && <input
            type="text"
            placeholder={'value'}
            className="border-none outline-0 text-sm px-4"
            value={props.value}
            onFocus={() => setEditingModeOn(true)}
            onBlur={() => setEditingModeOn(props.type === 'TYPE' || false)}
            onChange={(e) => {
              props.onChangeValue?.(e.target.value)
            }}
          />}
          {editingModeOn && props.type === 'TYPE' && <div className={'divider my-0'}/>}
          {editingModeOn && {CLICK: true, TYPE: true}[props.type] && <input
            type="text"
            className="border-none outline-0 text-sm px-4"
            value={props.target}
            placeholder={'target'}
            onFocus={() => setEditingModeOn(true)}
            onBlur={() => setEditingModeOn(false)}
            onChange={(e) => {
              props.onChangeTarget?.(e.target.value)
            }}
          />}
        </div>
      </div>
      <hr className={'first-divider'}/>
      <hr className={'second-divider'}/>
    </li>
  )
}

type StepActionType = 'CLICK' | 'TYPE' | 'WAIT' | 'NAVIGATE'

function StepAction(props: { type: StepActionType, className?: string }) {
  let icon: string | number | boolean | JSX.Element | Iterable<ReactNode>;
  if (props.type === 'CLICK') {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path
          d="M468-240q-96-5-162-74t-66-166q0-100 70-170t170-70q97 0 166 66t74 162l-84-25q-13-54-56-88.5T480-640q-66 0-113 47t-47 113q0 57 34.5 100t88.5 56l25 84ZM821-60 650-231 600-80 480-480l400 120-151 50 171 171-79 79Z"/>
      </svg>
    )
  } else if (props.type === 'TYPE') {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path
          d="M280-280v-80h400v80H280ZM120-440v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80ZM120-600v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 0v-80h80v80h-80Z"/>
      </svg>
    )
  } else if (props.type === 'WAIT') {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path
          d="M320-160h320v-120q0-66-47-113t-113-47q-66 0-113 47t-47 113v120ZM160-80v-80h80v-120q0-61 28.5-114.5T348-480q-51-32-79.5-85.5T240-680v-120h-80v-80h640v80h-80v120q0 61-28.5 114.5T612-480q51 32 79.5 85.5T720-280v120h80v80H160Z"/>
      </svg>
    )
  } else if (props.type === 'NAVIGATE') {
    icon = (
      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
        <path d="M704-240 320-624v344h-80v-480h480v80H376l384 384-56 56Z"/>
      </svg>
    )
  }

  return (
    <>{icon}</>
  )
}

function getColorByActionType(type: StepActionType) {
  if (type === 'CLICK') {
    return 'text-cyan-600'
  } else if (type === 'TYPE') {
    return 'text-red-600'
  } else if (type === 'WAIT') {
    return 'text-lime-600'
  } else if (type === 'NAVIGATE') {
    return 'text-violet-500'
  }
}

export default EditMonitorDrawer
