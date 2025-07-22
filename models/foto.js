'use strict';
const mongoose = require('mongoose');

const FotoSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  calificacion: Number,
  ruta: String,
  etiquetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Etiqueta' }]
});

module.exports = mongoose.model('Foto', FotoSchema);