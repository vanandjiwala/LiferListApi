'use strict';
module.exports = (sequelize, DataTypes) => {
  var species = sequelize.define('species', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
    scientificName: DataTypes.STRING,
    status: DataTypes.STRING,
    category_id: DataTypes.INTEGER
  }, {
    indexes: [
      {
        name: 'id_index',
        method: 'BTREE',
        fields: ['id']
    },
    {
      name: 'category_id_index',
      method: 'BTREE',
      fields: ['category_id']
  }
    ]
  });
  species.associate = function(models) {
    // associations can be defined here
    this.belongsTo(models.category, {as: 'categoryId', foreignKey : 'category_id'},{ onDelete: 'cascade' });
  };
  return species;
};