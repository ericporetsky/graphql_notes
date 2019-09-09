const { Note } = require('../../models');

const notes = async (parent, args, context) => {
  const notes = await Note.findAll({where: {userID: context.user.id}});
  return notes;
}

module.exports = {
  notes,
}