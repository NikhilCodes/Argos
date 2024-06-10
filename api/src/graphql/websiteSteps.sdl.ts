export const schema = gql`
  type WebsiteStep {
    id: Int!
    action: ActionType!
    target: String
    value: String
    Monitor: Monitor
    monitorsId: Int
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum ActionType {
    CLICK
    TYPE
    NAVIGATE
    WAIT
  }

  type Query {
    websiteSteps: [WebsiteStep!]! @requireAuth
    websiteStep(id: Int!): WebsiteStep @requireAuth
  }

  input CreateWebsiteStepInput {
    action: ActionType!
    target: String
    value: String
    monitorsId: Int
  }

  input UpdateWebsiteStepInput {
    action: ActionType
    target: String
    value: String
    monitorsId: Int
  }

  type Mutation {
    createWebsiteStep(input: CreateWebsiteStepInput!): WebsiteStep! @requireAuth
    updateWebsiteStep(id: Int!, input: UpdateWebsiteStepInput!): WebsiteStep!
      @requireAuth
    deleteWebsiteStep(id: Int!): WebsiteStep! @requireAuth
  }
`
