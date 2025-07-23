const express = require('express');
const router = express.Router();
const Etiqueta = require('../models/etiqueta');
const verificarJWT = require('../middleware/auth');

// API REST
// Obtener todas las etiquetas (JSON)
router.get('/api', async (req, res) => {
  try {
    const etiquetas = await Etiqueta.find();
    res.json(etiquetas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una etiqueta por ID (JSON)
router.get('/api/:id', async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findById(req.params.id);
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(etiqueta);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear una etiqueta (JSON)
router.post('/api', async (req, res) => {
  try {
    const etiqueta = new Etiqueta({ texto: req.body.texto });
    await etiqueta.save();
    res.status(201).json(etiqueta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar una etiqueta (JSON)
router.put('/api/:id', async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findByIdAndUpdate(
      req.params.id,
      { texto: req.body.texto },
      { new: true }
    );
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json(etiqueta);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una etiqueta (JSON)
router.delete('/api/:id', async (req, res) => {
  try {
    const etiqueta = await Etiqueta.findByIdAndDelete(req.params.id);
    if (!etiqueta) return res.status(404).json({ error: 'Etiqueta no encontrada' });
    res.json({ message: 'Etiqueta eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// VISTAS EJS
// Listar etiquetas
router.get('/', async (req, res) => {
  const etiquetas = await Etiqueta.find();
  res.render('etiquetas', { etiquetas });
});

// Formulario nueva etiqueta
router.get('/new', (req, res) => {
  res.render('etiqueta_new');
});

// Crear etiqueta desde formulario
router.post('/', verificarJWT, async (req, res) => {
  try {
    const etiqueta = new Etiqueta({ texto: req.body.texto });
    await etiqueta.save();
    res.redirect('/etiquetas');
  } catch (err) {
    res.render('etiqueta_new', { error: err.message });
  }
});

// Formulario editar etiqueta
router.get('/:id/edit', async (req, res) => {
  const etiqueta = await Etiqueta.findById(req.params.id);
  if (!etiqueta) return res.redirect('/etiquetas');
  res.render('etiqueta_edit', { etiqueta });
});

// Actualizar etiqueta desde formulario
router.post('/:id/edit', verificarJWT, async (req, res) => {
  try {
    await Etiqueta.findByIdAndUpdate(req.params.id, { texto: req.body.texto });
    res.redirect('/etiquetas');
  } catch (err) {
    res.render('etiqueta_edit', { etiqueta: { _id: req.params.id, texto: req.body.texto }, error: err.message });
  }
});

// Eliminar etiqueta
router.post('/:id/delete', verificarJWT, async (req, res) => {
  await Etiqueta.findByIdAndDelete(req.params.id);
  res.redirect('/etiquetas');
});

module.exports = router; 