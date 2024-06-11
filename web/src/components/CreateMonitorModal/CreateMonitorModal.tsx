import {SyntheticEvent, useEffect, useRef, useState} from "react";
import {twMerge} from "tailwind-merge";
import {useMutation} from "@redwoodjs/web";
import {toast} from "@redwoodjs/web/toast";
import {useSocket} from "src/contexts/socketContext";

interface CreateMonitorModalProps {
  visible: boolean
  onClose?: () => void
}

type MonitorType = 'CLI' | 'WEB'
type ResponseType = 'text' | 'select'

const CREATE_MONITOR = gql`
  mutation CreateMonitor($input: CreateMonitorInput!) {
    createMonitor(input: $input) {
      id
    }
  }
`

const CreateMonitorModal = (props: CreateMonitorModalProps) => {
  const ref = useRef<HTMLDialogElement>(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [showQuestion, setShowQuestion] = useState(true)

  const [monitorName, setMonitorName] = useState<string>("")
  const [monitorType, setMonitorType] = useState<MonitorType>()
  const [monitorCommand, setMonitorCommand] = useState<string>("")
  const [monitorUrl, setMonitorUrl] = useState<string>("")
  const {socket} = useSocket()

  const [create, {loading, error}] = useMutation(CREATE_MONITOR, {
    onCompleted: () => {
      toast.success('Monitor created!')
      handleClose()
      socket.emit('refresh')
    }
  })

  useEffect(() => {
    if (!ref.current) {
      return
    }
    setQuestionIndexWithAnimation(0)
    props.visible ? ref.current?.showModal() : ref.current?.close()
  }, [props.visible])

  const handleClose = () => {
    if (ref.current) {
      ref.current.close()
      props.onClose?.()
      setMonitorName('')
      setMonitorType(undefined)
      setMonitorUrl('')
      setMonitorCommand('')
    }
  }
  const handleEsc = (e: SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    handleClose()
  }

  const setQuestionIndexWithAnimation = (index: number) => {
    setShowQuestion(false)
    setQuestionIndex(index)
    setTimeout(() => setShowQuestion(true), 100)
  }

  const handleCompletion = () => {
    create({
      variables: {
        input: {
          name: monitorName,
          type: monitorType,
          commands: monitorType === 'CLI' ? monitorCommand : undefined,
          url: monitorType === 'WEB' ? monitorUrl : undefined,
        }
      }
    })
  }

  return (
    <dialog className={"modal transition-all"} onCancel={handleEsc} ref={ref}>
      <div className="modal-box p-10 text-center transition-all">
        <h3 className={'mt-0'}>Add Monitor</h3>
        <div className={'transition [&>div]:transition'}>
          <div className={questionIndex === 0 ? 'visible' : 'hidden'}>
            <div
              className={twMerge('text-3xl delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            >
              What do you wanna call it?
            </div>
            <input
              type="text"
              placeholder={'Answer!'}
              value={monitorName}
              onChange={(e) => setMonitorName(e.target.value)}
              className={twMerge('input text-center mt-4 delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            />
            <NextButton visible={monitorName.length !== 0} onClick={() => {
              setQuestionIndexWithAnimation(1)
            }}/>
          </div>

          <div className={questionIndex === 1 ? 'visible' : 'hidden'}>
            <div
              className={twMerge('text-3xl delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            >
              What kind of monitoring do you want?
            </div>
            <div
              className={twMerge('join mt-4 delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}>
              <button className={'btn join-item btn-outline hover:text-white btn-info'} onClick={() => {
                setMonitorType('CLI')
                setQuestionIndexWithAnimation(2)
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="currentColor">
                  <path
                    d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Zm140-40-56-56 103-104-104-104 57-56 160 160-160 160Zm180 0v-80h240v80H480Z"/>
                </svg>
                CLI
              </button>
              <button className={'btn join-item btn-outline hover:text-white btn-success'} onClick={() => {
                setMonitorType('WEB')
                setQuestionIndexWithAnimation(3)
              }}>
                Web
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="currentColor">
                  <path
                    d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/>
                </svg>
              </button>
            </div>
          </div>

          <div className={questionIndex === 2 ? 'visible' : 'hidden'}>
            <div
              className={twMerge('text-3xl delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            >
              What is the command you want to run?
            </div>
            <textarea
              value={monitorCommand}
              onChange={(e) => setMonitorCommand(e.target.value)}
              placeholder={'example #1: ssh user@host uptime\nexample #2: tail /app/logs/error.log'}
              cols={40}
              rows={4}
              className={twMerge('textarea textarea-bordered mt-4 delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            />
            <CompletionButton loading={loading} visible={monitorCommand.length !== 0} onClick={() => handleCompletion()}/>
          </div>

          <div className={questionIndex === 3 ? 'visible' : 'hidden'}>
            <div
              className={twMerge('text-3xl delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            >
              What is the URL you want to monitor?
            </div>
            <input
              type="text"
              value={monitorUrl}
              onChange={(e) => setMonitorUrl(e.target.value)}
              placeholder={'Answer!'}
              className={twMerge('input text-center mt-4 delay-300 transition translate-y-1/2 opacity-0', showQuestion && 'translate-y-0 opacity-100')}
            />
            <CompletionButton loading={loading} visible={monitorUrl.length !== 0} onClick={() => handleCompletion()}/>
          </div>
        </div>
      </div>
    </dialog>
  )
}

function NextButton(props: { onClick: () => void, visible: boolean }) {
  return (
    <div className={'mt-4'}>
      <button
        onClick={props.onClick}
        className={twMerge('btn btn-primary px-8 transition', props.visible ? 'opacity-100' : 'opacity-0')}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
          <path d="M693.85-313.85 651.08-356l94-94H140v-60h605.08l-93.39-94 42.77-42.15L860-480 693.85-313.85Z"/>
        </svg>
      </button>
    </div>
  )
}

function CompletionButton(props: { onClick: () => void, visible: boolean, loading?: boolean }) {
  return (
    <div className={'mt-4'}>
      <button
        onClick={props.onClick}
        disabled={props.loading}
        className={twMerge('btn btn-success px-8 transition', props.visible ? 'opacity-100' : 'opacity-0')}>
        {props.loading ? <span className="loading loading-infinity text-white"></span> :
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M382-253.85 168.62-467.23 211.38-510 382-339.38 748.62-706l42.76 42.77L382-253.85Z"/>
          </svg>}
      </button>
    </div>
  )
}

export default CreateMonitorModal

