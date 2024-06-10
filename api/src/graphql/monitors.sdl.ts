export const schema = gql`
  type Monitor {
    id: Int!
    name: String!
    type: MonitorType!
    url: String
    commands: String
    stdin: String
    createdAt: DateTime!
    updatedAt: DateTime!
    WebsiteStep: [WebsiteStep]!
  }

  enum MonitorType {
    CLI
    WEB
  }

  type Query {
    monitors: [Monitor!]! @requireAuth
    monitor(id: Int!): Monitor @requireAuth
  }

  input CreateMonitorInput {
    name: String!
    type: MonitorType!
    url: String
    commands: String
    stdin: String
  }

  input UpdateMonitorInput {
    name: String
    type: MonitorType
    url: String
    commands: String
    stdin: String
  }

  type Mutation {
    createMonitor(input: CreateMonitorInput!): Monitor! @requireAuth
    updateMonitor(id: Int!, input: UpdateMonitorInput!): Monitor! @requireAuth
    deleteMonitor(id: Int!): Monitor! @requireAuth
  }
`
