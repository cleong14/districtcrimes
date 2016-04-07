'use strict';
module.exports = function(sequelize, DataTypes) {
  var crime = sequelize.define('crime', {
    objectID: DataTypes.INTEGER,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    location: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    houseDistrict: DataTypes.INTEGER,
    senateDistrict: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return crime;
};