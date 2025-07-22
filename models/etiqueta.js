'use strict';
const mongoose = require('mongoose');

const EtiquetaSchema = new mongoose.Schema({
  texto: String
});

module.exports = mongoose.model('Etiqueta', EtiquetaSchema);
