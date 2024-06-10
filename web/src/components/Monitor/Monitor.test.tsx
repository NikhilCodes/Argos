import { render } from '@redwoodjs/testing/web'

import Monitor from './Monitor'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Monitor', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Monitor />)
    }).not.toThrow()
  })
})
