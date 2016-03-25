'use strict';
module.exports = function(sequelize, DataTypes) {
  var crime = sequelize.define('crime', {
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return crime;
};