import { render } from '@redwoodjs/testing/web'

import GlassMorphismBgLayout from './GlassMorphismBgLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GlassMorphismBgLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GlassMorphismBgLayout />)
    }).not.toThrow()
  })
})
