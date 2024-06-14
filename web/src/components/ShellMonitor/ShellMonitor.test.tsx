import { render } from '@redwoodjs/testing/web'

import ShellMonitor from './ShellMonitor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ShellMonitor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ShellMonitor />)
    }).not.toThrow()
  })
})
