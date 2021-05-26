const express = require('express');

// Middlewares
const auth = require('../middleware/auth');
const usuariosMiddleware = require('../middleware/usuarios');

// Controllers
const usuariosController = require('../controllers/usuarios');
const turnosController = require('../controllers/turnos');

// Routes
const router = express.Router();

router
    .post('/', usuariosController.guardar)
    .get('/cuenta', [auth, usuariosMiddleware.cuenta], usuariosController.cuenta)
    .put('/cuenta', [auth, usuariosMiddleware.cuenta], usuariosController.actualizar)
    .post('/login', usuariosController.login)
    .get('/turnos/expirados', [auth, usuariosMiddleware.cuenta], turnosController.expirados)
    .get('/turnos/usados', [auth, usuariosMiddleware.cuenta], turnosController.usados)
    .get('/turnos/cancelados', [auth, usuariosMiddleware.cuenta], turnosController.cancelados)
    .get('/turnos/activos', [auth, usuariosMiddleware.cuenta], turnosController.activos)
    .get('/favoritos', [auth, usuariosMiddleware.cuenta], usuariosController.getFavoritos);

module.exports = router;
