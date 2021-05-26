const express = require('express');

// Middlewares
const auth = require('../middleware/auth');
const soportesMiddleware = require('../middleware/soportes');
const cuentaAdmin = require('../middleware/cuenta_admin');

// Controllers
const soportesController = require('../controllers/soportes');

// Routes
const router = express.Router();

router
    .get('/buscar', [auth, soportesMiddleware.cuenta], soportesController.buscar)
    .get('/:soporte', [auth, soportesMiddleware.cuenta], soportesController.cuenta)
    .post('/', [auth, soportesMiddleware.cuenta, cuentaAdmin], soportesController.guardar)
    .post('/login', soportesController.login);

module.exports = router;
