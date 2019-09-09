# Node GraphQL Note-Taking App

A simple node app utilizing GraphQL, Postgres, and Express to allow users to create and keep track of notes. The app utilizes JSON web tokens for authorization/login.

## GraphQL API

### User

A signed up user.

```
type User {
  id: ID!
  email: String!
  password: String!
  notes: [Note!]!
}
```

### Note

A user-created note.

```
type Note {
  id: ID!
  description: String!
  createdBy: User!
}
```

### Auth

Returns a JWT and (optional) user data on signup/login.

```
type Auth { 
	token: String
	user: User
}
```

## Query's

### me

Returns the user profile.

```
me: User
```

### getNotes

Returns the user's notes.

```
getNotes: [Note!]!
```

## Mutations

### login

Logs in a user and returns an `Auth` payload.

```
login (email: String!, password: String!): Auth
```

### signup

Signs a user up and returns an `Auth` payload.

```
signup (email: String!, password: String!): Auth
```

### createNote

Creates a note and returns a `Note` type.

```
createNote (description: String!): Note
```

### updateNote

Updates a note and returns a boolean indiciating whether or not the update was successful.

```
updateNote(id: ID!, description: String!): Boolean!
```

### deleteNote

Deletes a note and returns a boolean indiciating whether or not the delete was successful.

```
deleteNote(id: ID!): Boolean!
```

## Testing

You can test out the graphql database at

```
https://afternoon-stream-94264.herokuapp.com/graphql
```






