const express = require('express');
const router = express.Router();
const Etiqueta = require('../models/etiqueta');
const verificarJWT = require('../middleware/auth');
const mongoose = require('mongoose');

// Obtener todas las etiquetas (JSON)
router.get('/', async (req, res) => {
  try {
    const etiquetas = await Etiqueta.find();
    res.json(etiquetas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una etiqueta por ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de etiqueta inválido' });
    }
    const etiqueta = await Etiqueta.findById(req.params.id);
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(etiqueta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una etiqueta
router.post('/', verificarJWT, async (req, res) => {
  try {
    const etiqueta = new Etiqueta({ nombre: req.body.nombre });
    await etiqueta.save();
    res.status(201).json(etiqueta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar una etiqueta
router.put('/:id', verificarJWT, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de etiqueta inválido' });
    }
    const etiqueta = await Etiqueta.findByIdAndUpdate(
      req.params.id,
      { nombre: req.body.nombre },
      { new: true }
    );
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(etiqueta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una etiqueta
router.delete('/:id', verificarJWT, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de etiqueta inválido' });
    }
    const etiqueta = await Etiqueta.findByIdAndDelete(req.params.id);
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json({ message: 'Etiqueta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 