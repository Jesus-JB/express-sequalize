const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secreto_jwt';

// Formulario de registro
router.get('/register', (req, res) => {
  res.render('register', { error: null });
});

// Procesar registro
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.render('register', { error: 'El email ya está registrado.' });
    }
    const usuario = new Usuario({ email, password });
    await usuario.save();
    res.redirect('/users/login');
  } catch (err) {
    res.render('register', { error: 'Error al registrar usuario.' });
  }
});

// Formulario de login
router.get('/login', (req, res) => {
  res.render('login', { error: null, token: null });
});

// Procesar login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Intentando login con email:', email);
    const usuario = await Usuario.findOne({ email });
    console.log('Usuario encontrado:', usuario);
    if (!usuario) {
      return res.render('login', { error: 'Credenciales incorrectas.', token: null });
    }
    const esValido = await usuario.compararPassword(password);
    console.log('¿Password válido?', esValido);
    if (!esValido) {
      return res.render('login', { error: 'Credenciales incorrectas.', token: null });
    }
    // Generar JWT
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, SECRET, { expiresIn: '1h' });
    res.render('login', { error: null, token });
  } catch (err) {
    console.error('Error en login:', err);
    res.render('login', { error: 'Error al iniciar sesión.', token: null });
  }
});

module.exports = router;
