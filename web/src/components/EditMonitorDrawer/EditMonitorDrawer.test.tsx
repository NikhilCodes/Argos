import { render } from '@redwoodjs/testing/web'

import EditMonitorDrawer from './EditMonitorDrawer'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditMonitorDrawer', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditMonitorDrawer />)
    }).not.toThrow()
  })
})
