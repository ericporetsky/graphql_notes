
const { User, Note } = require('../../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

//Internal Helper Function to check if the user is logged in (based on the JWT)
const loggedInUser = async (context) => {
    if (!context.user) {
        throw new Error('You are not logged in!');
    }
    const user = await User.findOne({ where: { id: context.user.id } });
    return user;
} 



const signup = async (parent, args, context, info) => {

  let user = await User.findOne({ where: { email: args.email } });

  if (user) {
    throw new Error('User with that email already exists.')
  }
  else {
    const password = await bcrypt.hash(args.password, 10);
    user = await User.create({email: args.email, password: password});
  }

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

  console.log(user)
  return {
    token, user
  }

}

const login = async (parent, args, context, info) => {

  const user = await User.findOne({ where: { email: args.email } });

  if (!user) {
    throw new Error('No user with that email exists.')
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password.')
  }

  const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'});

  return {
    token,
    user,
  }

}

const createNote = async (parent, args, context, info) => {

    const user = await loggedInUser(context);
    const note = await Note.create({description: args.description, userID: user.id});
    return {
      id: note.id,
      description: note.description,
      createdBy: user
    }

}

const deleteNote = async (parent, args, context, info) => {

    const user = await loggedInUser(context);
    const note = await Note.findOne({ where: { id: args.id } });
    if (!note) {
      throw new Error(`Note with id ${args.id} does not exist.`);
    }

    const destroyCount = await Note.destroy({ where: { id: args.id } }); //returns number of rows destroyed
    return (destroyCount > 0);

}

const updateNote = async (parent, args, context, info) => {

    const user = await loggedInUser(context);

    let note = await Note.findOne({ where: { id: args.id } });
    if (!note) {
      throw new Error(`Note with id ${args.id} does not exist.`);
    }

    const updateCount = await Note.update({description: args.description}, {where: {id: args.id}}); //returns number of rows updated
    return (updateCount > 0);

}





module.exports = {
  signup,
  login,
  createNote,
  deleteNote,
  updateNote
}