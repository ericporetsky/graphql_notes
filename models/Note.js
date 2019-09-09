
'use strict';

module.exports = (sequelize, DataTypes) => {

  	const Note = sequelize.define('Note', {
  	  description: {
      	type: DataTypes.STRING
	     },
      userID: {
        type: DataTypes.STRING
      }
  	});
	
  	Note.associate = models => {
      Note.belongsTo(models.User, { foreignKey: 'userID' });
    };
	
  	return Note;
};
