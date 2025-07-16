'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Etiqueta extends Model {
    static associate(models) {
      Etiqueta.belongsToMany(models.Foto, {
        through: models.FotoEtiqueta,
        foreignKey: 'etiqueta_id',
        otherKey: 'foto_id',
      });
    }
  }
  Etiqueta.init({
    texto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Etiqueta',
    tableName: 'etiqueta',
  });
  return Etiqueta;
};
