/*
* GQL Server to  allow a user to take notes
*/

//DEPENDENCIES
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql/schema');
const cookieParser = require('cookie-parser');
const express = require('express')
const jwt = require('express-jwt')
const bodyParser = require('body-parser')
const path=require('path');
const port = process.env.PORT || 5000
const views = require('./routes/views');

require('dotenv').config()

//EXPRESS
const app = express()


//MIDDLEWARE
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/public/views')); 


const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

//GRAPHQL SERVER
const gql_path = '/graphql';
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user // current user
  })
});
app.use(auth); // add jwt check to gql endpoint
server.applyMiddleware({app, gql_path});

//VIEWS
app.use('/', views);

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
});