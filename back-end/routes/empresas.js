const express = require('express');

// Middlewares
const auth = require('../middleware/auth');
const soportesMiddleware = require('../middleware/soportes');
const empresasMiddleware = require('../middleware/empresas');

// Controllers
const empresasController = require('../controllers/empresas');
const negociosController = require('../controllers/negocios');
const operarioController = require('../controllers/operarios');

// Routes
const router = express.Router();

router
    .post('/', [auth, soportesMiddleware.cuenta], empresasController.guardar)
    .post('/login', empresasController.login)
    .get('/datos/:empresa', [empresasMiddleware.recurso, auth], empresasController.cuenta)
    .get('/cuenta', [auth, empresasMiddleware.cuenta], empresasController.cuentaToken)
    .get('/turnos-activos', [auth, empresasMiddleware.cuenta], empresasController.traerTurnosActivos)
    .get('/estadisticas', [auth, empresasMiddleware.cuenta], empresasController.estadisticas)
    .get('/negocios-propios', [auth, empresasMiddleware.cuenta], empresasController.negociosPropios)
    .get('/buscar', [auth, soportesMiddleware.cuenta], empresasController.buscar)
    .post('/:empresa/negocios', [empresasMiddleware.recurso, auth, soportesMiddleware.cuenta], negociosController.guardar)
    .get('/:empresa/negocios', [empresasMiddleware.recurso, auth], empresasController.negocios)
    .post('/:empresa/operarios', [empresasMiddleware.recurso, auth, soportesMiddleware.cuenta], operarioController.guardar)
    .put('/:empresa/imagen', [empresasMiddleware.recurso, auth, soportesMiddleware.cuenta], empresasController.guardarImagen);

module.exports = router;
