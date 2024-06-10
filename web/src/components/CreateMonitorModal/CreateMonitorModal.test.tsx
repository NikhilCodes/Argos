import { render } from '@redwoodjs/testing/web'

import CreateMonitorModal from './CreateMonitorModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateMonitorModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateMonitorModal />)
    }).not.toThrow()
  })
})
