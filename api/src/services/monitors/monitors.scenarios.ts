import type { Prisma, Monitor } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.MonitorCreateArgs>({
  monitor: {
    one: {
      data: {
        name: 'String',
        type: 'CLI',
        updatedAt: '2024-06-12T10:35:23.739Z',
      },
    },
    two: {
      data: {
        name: 'String',
        type: 'CLI',
        updatedAt: '2024-06-12T10:35:23.739Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Monitor, 'monitor'>
