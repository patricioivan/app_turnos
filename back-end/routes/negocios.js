const express = require('express');

// Middlewares
const auth = require('../middleware/auth');
const usuariosMiddleware = require('../middleware/usuarios');
const negociosMiddleware = require('../middleware/negocios');
const horariosMiddleware = require('../middleware/horarios');

// Controller
const negociosController = require('../controllers/negocios');
const jornadaController = require('../controllers/jornada_laboral');
const diaNoLaboralController = require('../controllers/dia_no_laboral');
// const horarioController = require('../controllers/horarios');
const turnosController = require('../controllers/turnos');

// Routes
const router = express.Router();

router
    .get('/cercanos', [auth], negociosController.cercanos)
    .get('/buscar', [auth], negociosController.buscar)
    .get('/:negocio', [negociosMiddleware.recurso, auth], negociosController.ver)
    .get('/:negocio/editar', [negociosMiddleware.recurso, auth], negociosController.verEditar)
    .post('/:negocio/jornadas', [negociosMiddleware.recurso, auth], jornadaController.guardar)
    .get('/:negocio/jornadas', [negociosMiddleware.recurso, auth], jornadaController.traer)
    .delete('/:negocio/jornadas/:jornada', [negociosMiddleware.recurso, auth], jornadaController.eliminar)
    .post('/:negocio/dias-no-laborales', [negociosMiddleware.recurso, auth], diaNoLaboralController.guardar)
    .get('/:negocio/dias-no-laborales', [negociosMiddleware.recurso, auth], diaNoLaboralController.traer)
    .delete('/:negocio/dias-no-laborales/:dia', [negociosMiddleware.recurso, auth], diaNoLaboralController.eliminar)
    .get('/:negocio/horarios', [negociosMiddleware.recurso, auth], negociosController.verNegocioHorario)
    .get('/:negocio/horarios-todos', [negociosMiddleware.recurso, auth], negociosController.verTodosHorarios)
    .post('/:negocio/horarios-segun-dia', [negociosMiddleware.recurso, auth], negociosController.traerHorariosSegunDiaSeleccionado)
    .post('/:negocio/horarios/:horario/turnos', [negociosMiddleware.recurso, horariosMiddleware.recurso, auth, usuariosMiddleware.cuenta], turnosController.guardar)
    .post('/:negocio/rating', [negociosMiddleware.recurso, auth, usuariosMiddleware.cuenta], negociosController.rating)
    .get('/:negocio/rating', [negociosMiddleware.recurso, auth], negociosController.getRatings)
    .post('/:negocio/favoritos', [negociosMiddleware.recurso, auth, usuariosMiddleware.cuenta], negociosController.addFavoritos)
    .delete('/:negocio/favoritos', [negociosMiddleware.recurso, auth, usuariosMiddleware.cuenta], negociosController.removeFavoritos)
    .get('/:negocio/turnos-activos', [negociosMiddleware.recurso], negociosController.traerTurnosActivos)
    .get('/:negocio/otras-sucursales', [negociosMiddleware.recurso, auth], negociosController.traerOtrasSucursales)
    .put('/:negocio', [negociosMiddleware.recurso, auth], negociosController.editar);

module.exports = router;
