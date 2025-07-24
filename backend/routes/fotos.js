const express = require('express');
const router = express.Router();

const Foto = require('../models/foto');
const Etiqueta = require('../models/etiqueta');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const verificarJWT = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Obtener todas las fotos (JSON), incluyendo etiquetas
router.get('/', async (req, res) => {
  try {
    const fotos = await Foto.find().populate('etiquetas');
    res.json(fotos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener una foto por ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de foto inválido' });
    }
    const foto = await Foto.findById(req.params.id).populate('etiquetas');
    if (!foto) return res.status(404).json({ error: 'Foto no encontrada' });
    res.json(foto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear una nueva foto
router.post('/', verificarJWT, upload.single('imagen'), async (req, res) => {
  try {
    const { titulo, descripcion, calificacion, etiquetas } = req.body;
    let ruta = '';
    if (req.file) {
      ruta = 'images/' + req.file.filename;
    } else {
      return res.status(400).json({ error: 'Debes subir una imagen.' });
    }
    const foto = new Foto({
      titulo,
      descripcion,
      calificacion,
      ruta,
      etiquetas: Array.isArray(etiquetas) ? etiquetas : etiquetas ? [etiquetas] : [],
      usuario: req.usuario.id
    });
    await foto.save();
    res.status(201).json(foto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Editar una foto existente
router.put('/:id', verificarJWT, upload.single('imagen'), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de foto inválido' });
    }
    const foto = await Foto.findById(req.params.id);
    if (!foto) return res.status(404).json({ error: 'Foto no encontrada' });
    // Solo el dueño o admin puede editar
    if (req.usuario.rol !== 'admin' && String(foto.usuario) !== req.usuario.id) {
      return res.status(403).json({ error: 'No tienes permiso para editar esta foto' });
    }
    const { titulo, descripcion, calificacion, etiquetas } = req.body;
    let updateData = {
      titulo,
      descripcion,
      calificacion,
      etiquetas: Array.isArray(etiquetas) ? etiquetas : etiquetas ? [etiquetas] : []
    };
    if (req.file) {
      updateData.ruta = 'images/' + req.file.filename;
    }
    const updatedFoto = await Foto.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedFoto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar una foto
router.delete('/:id', verificarJWT, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID de foto inválido' });
    }
    const foto = await Foto.findById(req.params.id);
    if (!foto) return res.status(404).json({ error: 'Foto no encontrada' });
    // Solo el dueño o admin puede eliminar
    if (req.usuario.rol !== 'admin' && String(foto.usuario) !== req.usuario.id) {
      return res.status(403).json({ error: 'No tienes permiso para eliminar esta foto' });
    }
    await Foto.findByIdAndDelete(req.params.id);
    res.json({ message: 'Foto eliminada' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;