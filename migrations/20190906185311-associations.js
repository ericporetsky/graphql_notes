'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Notes', 
      'userID', 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', 
          key: 'id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Notes', // name of Source model
      'userID' // key we want to remove
    );
  }
};
