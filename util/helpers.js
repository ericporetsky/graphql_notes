
require('dotenv').config;

// const graphql = `https://afternoon-stream-94264.herokuapp.com/graphql`; //update with .env or .config
const graphql = `http://127.0.0.1:5000/graphql`;
const fetch = require('isomorphic-fetch');

const graphql_fetch = async (gql_query, jwt_token) => {

	const query = JSON.stringify({
		query: gql_query
	});

	const request =  {
	    headers: {
	    	'content-type': 'application/json',
	    	...(jwt_token && { 'Authorization': `Bearer ${jwt_token}` }),
	    },
	    method: 'POST',
	    body: query,
	}
	const response = await fetch(graphql, request);
  	const json = await response.json();
  	return json.data;

}

const signup = async (email, password) => {
	const query = `mutation {
          signup(email: "${email}", password: "${password}") {
          	token
          	user {
          		id
          	}
          }
        }
    `
    const data = await graphql_fetch(query)
    return data;
}

const login = async (email, password) => {
	const query = `mutation {
          login(email: "${email}", password: "${password}") {
          	token
          	user {
          		id
          	}
          }
        }
    `
    const data = await graphql_fetch(query)
    return data;
}

const profile =  async (jwt_token) => {
	const query = `query {
          me {
          	id
          	email
          }
          getNotes {
          	id
          	description
          }
        }
    `
    const data = await graphql_fetch(query, jwt_token)
    return data;
}

const createNote =  async (description, jwt_token) => {
	const query = `mutation {
          	createNote(description: "${description}") {
          		id
          		description
          	}
        }
    `
    const data = await graphql_fetch(query, jwt_token)
    return data;
}

const deleteNote =  async (id, jwt_token) => {
	const query = `mutation {
          	deleteNote(id: "${id}") 
        }
    `
    const data = await graphql_fetch(query, jwt_token)
    return data;
}

const updateNote =  async (args, jwt_token) => {
	const query = `mutation {
          	updateNote(id: "${args.id}", description: "${args.description}") 
        }
    `
    const data = await graphql_fetch(query, jwt_token)
    return data;
}


module.exports = {
	signup, 
	login,
	profile,
	createNote,
	deleteNote,
	updateNote
}