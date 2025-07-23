'use strict';
const mongoose = require('mongoose');

const EtiquetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Etiqueta', EtiquetaSchema);
