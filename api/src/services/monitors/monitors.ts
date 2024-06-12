import type {
  QueryResolvers,
  MutationResolvers,
  MonitorRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const monitors: QueryResolvers['monitors'] = () => {
  return db.monitor.findMany({
    orderBy: { createdAt: 'desc' },
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
