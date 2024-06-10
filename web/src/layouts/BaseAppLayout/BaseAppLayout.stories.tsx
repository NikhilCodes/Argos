import type { Meta, StoryObj } from '@storybook/react'

import BaseAppLayout from './BaseAppLayout'

const meta: Meta<typeof BaseAppLayout> = {
  component: BaseAppLayout,
}

export default meta

type Story = StoryObj<typeof BaseAppLayout>

export const Primary: Story = {}
