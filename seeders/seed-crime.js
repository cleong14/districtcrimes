'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('crimes', [
      {
        date: new Date(1447785240),
        type: 'MOTOR VEHICLE THEFT',
        location: 'H3W HALAWA VLY  UP',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('crimes', null, {});
  }
};
