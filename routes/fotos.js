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

router.use((req, res, next) => {
  console.log('RUTA FOTOS:', req.method, req.originalUrl);
  next();
});

// Obtener todas las fotos en formato JSON, incluyendo etiquetas
router.get('/findAll/json', async (req, res) => {
  try {
    const fotos = await Foto.find().populate('etiquetas');
    res.json(fotos);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todas las fotos y renderizar la vista, incluyendo etiquetas
router.get('/findAll/view', async (req, res) => {
  try {
    const fotos = await Foto.find().populate('etiquetas');
    res.render('fotos', { title: 'Fotos', arrFotos: fotos });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Formulario para crear una nueva foto
router.get('/new', async (req, res) => {
  const etiquetas = await Etiqueta.find();
  res.render('foto_new', { title: 'Nueva Foto', etiquetas });
});

// Procesar el formulario de creación de foto (con imagen)
router.post('/new', verificarJWT, upload.single('imagen'), async (req, res) => {
  try {
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    const { titulo, descripcion, calificacion, etiquetas } = req.body;
    let ruta = '';
    if (req.file) {
      ruta = 'images/' + req.file.filename;
    } else {
      // Si no se sube archivo, mostrar error y no guardar la foto
      return res.status(400).send('Debes subir una imagen.');
    }
    const foto = new Foto({
      titulo,
      descripcion,
      calificacion,
      ruta,
      etiquetas: Array.isArray(etiquetas) ? etiquetas : etiquetas ? [etiquetas] : []
    });
    await foto.save();
    res.redirect('/fotos/findAll/view');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Formulario para editar una foto existente
router.get('/:id/edit', async (req, res) => {
  try {
    console.log('Intentando editar foto con id:', req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('ID inválido');
      return res.status(400).send('ID de foto inválido');
    }
    const foto = await Foto.findById(req.params.id).populate('etiquetas');
    console.log('Resultado de búsqueda:', foto);
    const etiquetas = await Etiqueta.find();
    if (!foto) return res.status(404).send('Foto no encontrada');
    res.render('foto_edit', { title: 'Editar Foto', foto, etiquetas });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Procesar la edición de una foto
router.post('/:id/edit', verificarJWT, upload.single('imagen'), async (req, res) => {
  try {
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
    await Foto.findByIdAndUpdate(req.params.id, updateData);
    res.redirect('/fotos/findAll/view');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una foto
router.post('/:id/delete', verificarJWT, async (req, res) => {
  try {
    console.log('Intentando eliminar foto con id:', req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('ID inválido');
      return res.status(400).send('ID de foto inválido');
    }
    const deleted = await Foto.findByIdAndDelete(req.params.id);
    console.log('Resultado de eliminación:', deleted);
    res.redirect('/fotos/findAll/view');
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;