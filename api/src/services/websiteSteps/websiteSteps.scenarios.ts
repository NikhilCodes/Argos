import type { Prisma, WebsiteStep } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WebsiteStepCreateArgs>({
  websiteStep: {
    one: { data: { action: 'CLICK', updatedAt: '2024-06-09T16:41:35.409Z' } },
    two: { data: { action: 'CLICK', updatedAt: '2024-06-09T16:41:35.409Z' } },
  },
})

export type StandardScenario = ScenarioData<WebsiteStep, 'websiteStep'>
