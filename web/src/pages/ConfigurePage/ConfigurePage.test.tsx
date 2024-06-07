import { render } from '@redwoodjs/testing/web'

import ConfigurePage from './ConfigurePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ConfigurePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConfigurePage />)
    }).not.toThrow()
  })
})
