/*
* GQL Server to  allow a user to take notes
*/

//DEPENDENCIES
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');
const express = require('express')
const jwt = require('express-jwt')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
require('dotenv').config()

//EXPRESS
const app = express()

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

//GRAPHQL SERVER
const path = '/graphql';
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user // current user
  })
});
app.use(path, auth); // add jwt check to gql endpoint
server.applyMiddleware({app, path});

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
});