'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FotoEtiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FotoEtiqueta.belongsTo(models.Foto, {
        foreignKey: 'foto_id',
        as: 'foto'
      });

      FotoEtiqueta.belongsTo(models.Etiqueta, {
        foreignKey: 'etiqueta_id',
        as: 'etiqueta'
      });
    }

  }
  FotoEtiqueta.init({
    foto_id: DataTypes.INTEGER,
    etiqueta_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FotoEtiqueta',
    tableName: 'foto_etiqueta'
  });
  return FotoEtiqueta;
};