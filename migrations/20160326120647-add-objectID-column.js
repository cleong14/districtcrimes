'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'crimes',
      'objectID',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('objectID');
  }
};
