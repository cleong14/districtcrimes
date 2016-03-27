'use strict';
module.exports = function(sequelize, DataTypes) {
  var crime = sequelize.define('crime', {
    objectID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return crime;
};