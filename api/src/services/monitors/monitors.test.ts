import type { Monitor } from '@prisma/client'

import {
  monitors,
  monitor,
  createMonitor,
  updateMonitor,
  deleteMonitor,
} from './monitors'
import type { StandardScenario } from './monitors.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('monitors', () => {
  scenario('returns all monitors', async (scenario: StandardScenario) => {
    const result = await monitors()

    expect(result.length).toEqual(Object.keys(scenario.monitor).length)
  })

  scenario('returns a single monitor', async (scenario: StandardScenario) => {
    const result = await monitor({ id: scenario.monitor.one.id })

    expect(result).toEqual(scenario.monitor.one)
  })

  scenario('creates a monitor', async () => {
    const result = await createMonitor({
      input: {
        name: 'String',
        type: 'CLI',
        updatedAt: '2024-06-12T10:35:23.728Z',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.type).toEqual('CLI')
    expect(result.updatedAt).toEqual(new Date('2024-06-12T10:35:23.728Z'))
  })

  scenario('updates a monitor', async (scenario: StandardScenario) => {
    const original = (await monitor({ id: scenario.monitor.one.id })) as Monitor
    const result = await updateMonitor({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a monitor', async (scenario: StandardScenario) => {
    const original = (await deleteMonitor({
      id: scenario.monitor.one.id,
    })) as Monitor
    const result = await monitor({ id: original.id })

    expect(result).toEqual(null)
  })
})
