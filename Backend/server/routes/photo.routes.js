const express = require('express');
const router = express.Router();
const controlador = require('../controller/photo.controller')

//imports
photoController = require('../controller/photo.controller')

// rutas
router.post('/subir/:id', controlador.uploadPicture);
router.post('/obtener/:id', controlador.getPhotos);

module.exports = router;