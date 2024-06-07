import type { Meta, StoryObj } from '@storybook/react'

import MonitorPage from './MonitorPage'

const meta: Meta<typeof MonitorPage> = {
  component: MonitorPage,
}

export default meta

type Story = StoryObj<typeof MonitorPage>

export const Primary: Story = {}
