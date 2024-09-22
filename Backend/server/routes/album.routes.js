const express = require('express');
const router = express.Router();
const controlador = require('../controller/album.controller')

//imports
albumController = require('../controller/album.controller')

// rutas
router.post('/crear/:id', controlador.createAlbum);
router.post('/editar/:id', controlador.updateAlbum);
router.post('/eliminar/:id', controlador.deleteAlbum);
router.get('/obtener/:id', controlador.getAlbum);

module.exports = router;