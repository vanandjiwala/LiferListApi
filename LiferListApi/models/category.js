'use strict';
module.exports = (sequelize, DataTypes) => {
  var category = sequelize.define('category', {
    id: {type: DataTypes.INTEGER,autoIncrement: true, primaryKey: true},
    categoryName: DataTypes.STRING
  }, {
    indexes: [
      {
        name: 'id_index',
        method: 'BTREE',
        fields: ['id']
    }
    ]
  });
  category.associate = function(models) {
    // associations can be defined here
  };
  return category;
};