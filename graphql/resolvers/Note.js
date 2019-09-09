const { User, Note } = require('../../models');

const createdBy = async (parent, args, context) => {
  
  const note = await Note.findOne({ where: { userID: context.user.id } })
  ;
  if (!note) {
      throw new Error(`Note with id ${args.id} does not exist.`);
  }
  const user = await User.findOne({ where: { id: note.userID } });
  return user
}

module.exports = {
  createdBy,
}