const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  me: User
  getNotes: [Note!]!
}

type Mutation {
  login (email: String!, password: String!): Auth
  signup (email: String!, password: String!): Auth
  createNote (description: String!): Note
  updateNote(id: ID!, description: String!): Boolean!
  deleteNote(id: ID!): Boolean!
}

type Auth {
	token: String
	user: User
}

type User {
  id: ID!
  email: String!
  password: String!
  notes: [Note!]!
}

type Note {
  id: ID!
  description: String!
  createdBy: User!
}`

module.exports = typeDefs;