var express = require('express');
var router = express.Router();


const Sequelize = require('sequelize');
const Foto = require('../models').Foto;

router.get('/findAll/json', function(req, res, next) {

    Foto.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
    .then(fotos => {
        res.json(fotos);
    })
    .catch(error => res.status(400).send(error))
});

router.get('/findAll/view', function(req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
    .then(fotos => {
        res.render('fotos', {title : 'Fotos', arrFotos: fotos });
    })
    .catch(error => res.status(400).send(error))
});

// Obtener foto por ID en JSON
router.get('/:id/json', async function(req, res, next) {
    try {
        const foto = await Foto.findByPk(req.params.id, {
            attributes: { exclude: ["updatedAt"] }
        });
        if (!foto) {
            return res.status(404).json({ error: 'Foto no encontrada' });
        }
        res.json(foto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener foto por ID y mostrar en vista
router.get('/:id/view', async function(req, res, next) {
    try {
        const foto = await Foto.findByPk(req.params.id, {
            attributes: { exclude: ["updatedAt"] }
        });
        if (!foto) {
            return res.status(404).render('error', { message: 'Foto no encontrada', error: {} });
        }
        res.render('foto', { title: 'Detalle Foto', foto });
    } catch (error) {
        res.status(400).render('error', { message: error.message, error });
    }
});

module.exports = router;