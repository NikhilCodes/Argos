import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const ConfigurePage = () => {
  return (
    <>
      <Metadata title="Configure" description="Configure page" />

      <h1>ConfigurePage</h1>
      <p>
        Find me in <code>./web/src/pages/ConfigurePage/ConfigurePage.tsx</code>
      </p>
      <p>
        My default route is named <code>configure</code>, link to me with `
        <Link to={routes.configure()}>Configure</Link>`
      </p>
    </>
  )
}

export default ConfigurePage
