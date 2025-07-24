const express = require('express');
const router = express.Router();
const Carpeta = require('../models/carpeta');
const Foto = require('../models/foto');
const verificarJWT = require('../middleware/auth');
const mongoose = require('mongoose');

// Crear carpeta
router.post('/', verificarJWT, async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: 'El nombre es obligatorio' });
    const carpeta = new Carpeta({ nombre, usuario: req.usuario.id });
    await carpeta.save();
    res.status(201).json(carpeta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Listar carpetas del usuario autenticado
router.get('/', verificarJWT, async (req, res) => {
  try {
    const carpetas = await Carpeta.find({ usuario: req.usuario.id }).sort({ fechaCreacion: -1 });
    res.json(carpetas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener carpeta y sus fotos
router.get('/:id', verificarJWT, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de carpeta inválido' });
    }
    const carpeta = await Carpeta.findById(req.params.id);
    if (!carpeta) return res.status(404).json({ error: 'Carpeta no encontrada' });
    if (String(carpeta.usuario) !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para ver esta carpeta' });
    }
    const fotos = await Foto.find({ carpeta: carpeta._id });
    res.json({ carpeta, fotos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar carpeta (y opcionalmente sus fotos)
router.delete('/:id', verificarJWT, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de carpeta inválido' });
    }
    const carpeta = await Carpeta.findById(req.params.id);
    if (!carpeta) return res.status(404).json({ error: 'Carpeta no encontrada' });
    if (String(carpeta.usuario) !== req.usuario.id && req.usuario.rol !== 'admin') {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta carpeta' });
    }
    // Eliminar todas las fotos de la carpeta
    await Foto.deleteMany({ carpeta: carpeta._id });
    await carpeta.deleteOne();
    res.json({ message: 'Carpeta y sus fotos eliminadas' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router; 