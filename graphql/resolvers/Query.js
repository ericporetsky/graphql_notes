const { User, Note } = require('../../models');

require('dotenv').config();

const me = async (parent, args, context, info) => {

    if (!context.user) {
        throw new Error('You are not logged in!')
    }
    const user = await User.findOne({ where: { id: context.user.id } });
    return user;
};

const getNotes = async (parent, args, context, info) => {
    const notes = await Note.findAll({where: {userID: context.user.id}});
    return notes;
}


module.exports = {
  me,
  getNotes
}