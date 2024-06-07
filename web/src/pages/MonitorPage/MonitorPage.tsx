import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const MonitorPage = () => {
  return (
    <>
      <Metadata title="Monitor" description="Monitor page" />

      <h1>MonitorPage</h1>
      <p>
        Find me in <code>./web/src/pages/MonitorPage/MonitorPage.tsx</code>
      </p>
      <p>
        My default route is named <code>monitor</code>, link to me with `
        <Link to={routes.monitor()}>Monitor</Link>`
      </p>
    </>
  )
}

export default MonitorPage
