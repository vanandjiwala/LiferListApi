'use strict';
module.exports = (sequelize, DataTypes) => {
  var liferlist = sequelize.define('liferlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    Name: { type: DataTypes.STRING, unique: true},
    Place: DataTypes.STRING
  }, {
    indexes: [
      {
        name: 'id_index',
        method: 'BTREE',
        fields: ['id']
    }
    ]
  });
  liferlist.associate = function(models) {
    // associations can be defined here
  };
  return liferlist;
};