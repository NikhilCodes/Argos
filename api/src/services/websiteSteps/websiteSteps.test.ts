import type { WebsiteStep } from '@prisma/client'

import {
  websiteSteps,
  websiteStep,
  createWebsiteStep,
  updateWebsiteStep,
  deleteWebsiteStep,
} from './websiteSteps'
import type { StandardScenario } from './websiteSteps.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('websiteSteps', () => {
  scenario('returns all websiteSteps', async (scenario: StandardScenario) => {
    const result = await websiteSteps()

    expect(result.length).toEqual(Object.keys(scenario.websiteStep).length)
  })

  scenario(
    'returns a single websiteStep',
    async (scenario: StandardScenario) => {
      const result = await websiteStep({ id: scenario.websiteStep.one.id })

      expect(result).toEqual(scenario.websiteStep.one)
    }
  )

  scenario('creates a websiteStep', async () => {
    const result = await createWebsiteStep({
      input: { action: 'CLICK', updatedAt: '2024-06-09T16:41:35.398Z' },
    })

    expect(result.action).toEqual('CLICK')
    expect(result.updatedAt).toEqual(new Date('2024-06-09T16:41:35.398Z'))
  })

  scenario('updates a websiteStep', async (scenario: StandardScenario) => {
    const original = (await websiteStep({
      id: scenario.websiteStep.one.id,
    })) as WebsiteStep
    const result = await updateWebsiteStep({
      id: original.id,
      input: { action: 'WAIT' },
    })

    expect(result.action).toEqual('WAIT')
  })

  scenario('deletes a websiteStep', async (scenario: StandardScenario) => {
    const original = (await deleteWebsiteStep({
      id: scenario.websiteStep.one.id,
    })) as WebsiteStep
    const result = await websiteStep({ id: original.id })

    expect(result).toEqual(null)
  })
})
