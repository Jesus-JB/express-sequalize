var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.json({ message: 'API de Galería funcionando' });
});

module.exports = router;
