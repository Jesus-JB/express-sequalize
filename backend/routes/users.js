const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secreto_jwt';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'secreto_refresh';
const verificarJWT = require('../middleware/auth');
const { esAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Registro de usuario (público, siempre rol usuario)
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }
    const usuario = new Usuario({ email, password, rol: 'usuario' });
    await usuario.save();
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (err) {
    res.status(400).json({ error: 'Error al registrar usuario.' });
  }
});

// Login de usuario
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }
    const esValido = await usuario.compararPassword(password);
    if (!esValido) {
      return res.status(400).json({ error: 'Credenciales incorrectas.' });
    }
    // Generar access token (1h) y refresh token (7d)
    const accessToken = jwt.sign({ id: usuario._id, email: usuario.email, rol: usuario.rol }, SECRET, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ id: usuario._id }, REFRESH_SECRET, { expiresIn: '7d' });
    // Guarda el refresh token en el usuario
    usuario.refreshTokens = usuario.refreshTokens || [];
    usuario.refreshTokens.push(refreshToken);
    await usuario.save();
    res.json({ accessToken, refreshToken });
  } catch (err) {
    res.status(400).json({ error: 'Error al iniciar sesión.' });
  }
});

// Endpoint para refrescar el access token
router.post('/refresh-token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ error: 'Refresh token requerido' });
  try {
    // Verifica el refresh token
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);
    const usuario = await Usuario.findById(payload.id);
    if (!usuario || !usuario.refreshTokens.includes(refreshToken)) {
      return res.status(403).json({ error: 'Refresh token inválido' });
    }
    // Genera un nuevo access token
    const accessToken = jwt.sign({ id: usuario._id, email: usuario.email, rol: usuario.rol }, SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ error: 'Refresh token inválido o expirado' });
  }
});

// Logout: elimina el refresh token usado
router.post('/logout', verificarJWT, async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: 'Refresh token requerido' });
  try {
    const usuario = await Usuario.findById(req.usuario.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    usuario.refreshTokens = (usuario.refreshTokens || []).filter(t => t !== refreshToken);
    await usuario.save();
    res.json({ message: 'Logout exitoso' });
  } catch (err) {
    res.status(400).json({ error: 'Error al hacer logout' });
  }
});

// CRUD de usuarios solo para admin
// Listar usuarios
router.get('/', verificarJWT, esAdmin, async (req, res) => {
  try {
    const usuarios = await Usuario.find({}, '-password');
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener usuarios.' });
  }
});

// Crear usuario (admin)
router.post('/', verificarJWT, esAdmin, async (req, res) => {
  const { email, password, rol } = req.body;
  try {
    const existe = await Usuario.findOne({ email });
    if (existe) {
      return res.status(400).json({ error: 'El email ya está registrado.' });
    }
    const usuario = new Usuario({ email, password, rol: rol || 'usuario' });
    await usuario.save();
    res.status(201).json({ message: 'Usuario creado correctamente.' });
  } catch (err) {
    res.status(400).json({ error: 'Error al crear usuario.' });
  }
});

// Editar usuario (admin)
router.put('/:id', verificarJWT, esAdmin, async (req, res) => {
  const { email, password, rol } = req.body;
  try {
    const updateData = { email, rol };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json({ message: 'Usuario actualizado correctamente.' });
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar usuario.' });
  }
});

// Eliminar usuario (admin)
router.delete('/:id', verificarJWT, esAdmin, async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado.' });
    res.json({ message: 'Usuario eliminado correctamente.' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar usuario.' });
  }
});

module.exports = router;
