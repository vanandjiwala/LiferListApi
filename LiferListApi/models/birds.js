'use strict';
module.exports = (sequelize, DataTypes) => {
  var birds = sequelize.define('birds', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: { type: DataTypes.STRING, unique: true},
    scientificName: { type: DataTypes.STRING, unique: true},
    status: { type: DataTypes.STRING},
  }, {});

  birds.associate = function(models) {
    
  };
  return birds;
};