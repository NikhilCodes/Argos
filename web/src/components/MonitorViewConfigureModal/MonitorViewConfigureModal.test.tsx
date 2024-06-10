import { render } from '@redwoodjs/testing/web'

import MonitorViewConfigureModal from './MonitorViewConfigureModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MonitorViewConfigureModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonitorViewConfigureModal />)
    }).not.toThrow()
  })
})
