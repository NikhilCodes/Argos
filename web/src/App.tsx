import {FatalErrorBoundary, RedwoodProvider} from '@redwoodjs/web'
import {RedwoodApolloProvider} from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'
import {RecoilRoot} from "recoil";
import {Toaster} from '@redwoodjs/web/toast'
import {SocketProvider} from "src/contexts/socketContext";

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <Toaster/>
      <RecoilRoot>
        <SocketProvider>
          <RedwoodApolloProvider>
            <Routes/>
          </RedwoodApolloProvider>
        </SocketProvider>
      </RecoilRoot>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
