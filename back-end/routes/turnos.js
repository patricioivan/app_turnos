const express = require('express');

// Controllers
const turnosController = require('../controllers/turnos');

// Middlewares
const auth = require('../middleware/auth');
const usuariosMiddleware = require('../middleware/usuarios');
const turnosMiddleware = require('../middleware/turnos');

// Routes
const router = express.Router();

router
    .put('/:turno/cancelar', [auth, usuariosMiddleware.cuenta, turnosMiddleware.recurso], turnosController.cancelar)
    .post('/validar', [auth], turnosController.validar);

module.exports = router;
