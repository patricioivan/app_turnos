const express = require('express');

// Middlewares
const auth = require('../middleware/auth');
const soportesMiddleware = require('../middleware/soportes');
const rubrosMiddleware = require('../middleware/rubros');

// Controllers
const rubrosController = require('../controllers/rubros');

// Routes
const router = express.Router();

router
    .post('/', [auth, soportesMiddleware.cuenta], rubrosController.guardar)
    .get('/', [auth], rubrosController.index)
    .get('/:rubro/negocios', [rubrosMiddleware.recurso, auth], rubrosController.negocios)
    .delete('/:rubro', [rubrosMiddleware.recurso, auth], rubrosController.eliminar)
    .get('/:rubro/negocios/buscar', [rubrosMiddleware.recurso, auth], rubrosController.buscarNegocios);

module.exports = router;
