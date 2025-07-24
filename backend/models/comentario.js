const mongoose = require('mongoose');

const ComentarioSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // autor
  foto: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: true }, // foto comentada
  texto: { type: String, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comentario', ComentarioSchema); 