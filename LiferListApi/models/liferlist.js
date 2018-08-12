'use strict';
module.exports = (sequelize, DataTypes) => {
  var liferlist = sequelize.define('liferlist', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    bird_id: DataTypes.INTEGER,
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
    this.belongsTo(models.birds, {as: 'birdId', foreignKey : 'bird_id'},{ onDelete: 'cascade' });
  };
  return liferlist;
};