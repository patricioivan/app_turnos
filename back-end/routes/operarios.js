const express = require('express');

// Middlewares
const operariosMiddleware = require('../middleware/operarios');

// Controllers
const operariosController = require('../controllers/operarios');

// Routes
const router = express.Router();

router
    .post('/login', operariosController.login);

module.exports = router;
