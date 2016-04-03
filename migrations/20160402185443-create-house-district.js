'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'crimes',
      'houseDistrict',
      Sequelize.INTEGER
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('crimes', 'houseDistrict');
  }
};
