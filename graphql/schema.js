

const typeDefs = require('./typeDefs'); //Type Definitions

//Resolvers
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Note = require('./resolvers/Note')

const resolvers = {
  Query,
  Mutation,
  User,
  Note
}

module.exports = {
	typeDefs,
	resolvers
};

