const express = require('express');
const router = express.Router();
const controlador = require('../controller/user.controller')

//imports
indexController = require('../controller/user.controller')

//rutas
router.get("/", indexController.index);

// crear usuario
router.post('/registro', controlador.register);
router.post('/login', controlador.login);
router.get('/perfil/:id', controlador.getProfile);
router.put('/perfil/:id', controlador.editProfile);
router.put('/', controlador.index);

module.exports = router;