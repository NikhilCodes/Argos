import type {
  QueryResolvers,
  MutationResolvers,
  MonitorRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monitors: QueryResolvers['monitors'] = () => {
  return db.monitor.findMany({
    orderBy: [
      {
        orderKey: 'asc',
      },
      {
        createdAt: 'desc',
      }
    ]
  })
}

export const monitor: QueryResolvers['monitor'] = ({ id }) => {
  return db.monitor.findUnique({
    where: { id },
  })
}

export const createMonitor: MutationResolvers['createMonitor'] = ({
  input,
}) => {
  return db.monitor.create({
    data: input,
  })
}

export const updateMonitor: MutationResolvers['updateMonitor'] = ({
  id,
  input,
}) => {
  return db.monitor.update({
    data: input,
    where: { id },
  })
}

export const updateMonitorsOrder: MutationResolvers['updateMonitorsOrder'] = async ({
  ids
}) => {
  const resolved = await Promise.allSettled(
    ids?.map((id: number, index: number) =>
      db.monitor.update({
        data: {orderKey: index},
        where: {id},
      }))
  )
  return resolved.filter((r) => r.status === 'fulfilled').length
}

export const deleteMonitor: MutationResolvers['deleteMonitor'] = ({ id }) => {
  return db.monitor.delete({
    where: { id },
  })
}

export const Monitor: MonitorRelationResolvers = {
  WebsiteStep: (_obj, { root }) => {
    return db.monitor.findUnique({ where: { id: root?.id } }).WebsiteStep()
  },
}
