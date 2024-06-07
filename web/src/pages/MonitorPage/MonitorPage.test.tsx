import { render } from '@redwoodjs/testing/web'

import MonitorPage from './MonitorPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MonitorPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MonitorPage />)
    }).not.toThrow()
  })
})
