'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Foto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Foto.belongsToMany(models.Etiqueta, {
        through: models.FotoEtiqueta,
        foreignKey: 'foto_id',
        otherKey: 'etiqueta_id',
      });
    }
  }
  Foto.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.TEXT,
    calificacion: DataTypes.FLOAT,
    ruta: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Foto',
    tableName: 'foto',
  });
  return Foto;
};