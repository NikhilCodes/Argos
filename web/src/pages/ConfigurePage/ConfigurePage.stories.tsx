import type { Meta, StoryObj } from '@storybook/react'

import ConfigurePage from './ConfigurePage'

const meta: Meta<typeof ConfigurePage> = {
  component: ConfigurePage,
}

export default meta

type Story = StoryObj<typeof ConfigurePage>

export const Primary: Story = {}
