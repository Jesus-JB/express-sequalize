const mongoose = require('mongoose');

const CarpetaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Carpeta', CarpetaSchema); 