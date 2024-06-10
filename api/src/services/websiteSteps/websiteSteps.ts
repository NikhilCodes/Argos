import type {
  QueryResolvers,
  MutationResolvers,
  WebsiteStepRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const websiteSteps: QueryResolvers['websiteSteps'] = () => {
  return db.websiteStep.findMany()
}

export const websiteStep: QueryResolvers['websiteStep'] = ({ id }) => {
  return db.websiteStep.findUnique({
    where: { id },
  })
}

export const createWebsiteStep: MutationResolvers['createWebsiteStep'] = ({
  input,
}) => {
  return db.websiteStep.create({
    data: input,
  })
}

export const updateWebsiteStep: MutationResolvers['updateWebsiteStep'] = ({
  id,
  input,
}) => {
  return db.websiteStep.update({
    data: input,
    where: { id },
  })
}

export const deleteWebsiteStep: MutationResolvers['deleteWebsiteStep'] = ({
  id,
}) => {
  return db.websiteStep.delete({
    where: { id },
  })
}

export const WebsiteStep: WebsiteStepRelationResolvers = {
  Monitor: (_obj, { root }) => {
    return db.websiteStep.findUnique({ where: { id: root?.id } }).Monitor()
  },
}
