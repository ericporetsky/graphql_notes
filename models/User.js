
'use strict';

module.exports = (sequelize, DataTypes) => {

  	const User = sequelize.define('User', {
      	email: {
          	type: DataTypes.STRING,
      	    unique: true,
    	  },
    	  password: {
    	  	type: DataTypes.STRING,
    	  }
  	});
	
  	User.associate = models => {
    	User.hasMany(models.Note, { onDelete: 'CASCADE', foreignKey: 'userID' });
  	};
	
  	return User;
};
