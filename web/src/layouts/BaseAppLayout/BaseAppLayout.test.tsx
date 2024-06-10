import { render } from '@redwoodjs/testing/web'

import BaseAppLayout from './BaseAppLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BaseAppLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BaseAppLayout />)
    }).not.toThrow()
  })
})
