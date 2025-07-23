const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secreto_jwt';

function verificarJWT(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    if (req.accepts('html')) {
      return res.status(401).render('error_auth', { mensaje: 'Debes iniciar sesión para acceder a esta funcionalidad.' });
    }
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET, (err, usuario) => {
    if (err) {
      if (req.accepts('html')) {
        return res.status(403).render('error_auth', { mensaje: 'Token inválido o expirado. Por favor, inicia sesión de nuevo.' });
      }
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }
    req.usuario = usuario;
    next();
  });
}

// Middleware para verificar si el usuario es admin
function esAdmin(req, res, next) {
  // req.usuario debe estar presente (verificarJWT debe ejecutarse antes)
  if (req.usuario && req.usuario.rol === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Acceso solo para administradores' });
}

module.exports = verificarJWT;
module.exports.esAdmin = esAdmin; 