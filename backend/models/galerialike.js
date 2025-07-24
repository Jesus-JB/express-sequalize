const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  foto: { type: mongoose.Schema.Types.ObjectId, ref: 'Foto', required: true }, // foto likeada
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true }, // quien da like
  fecha: { type: Date, default: Date.now }
});

// Un usuario solo puede dar like una vez a una foto
LikeSchema.index({ foto: 1, usuario: 1 }, { unique: true });

module.exports = mongoose.model('Like', LikeSchema); 