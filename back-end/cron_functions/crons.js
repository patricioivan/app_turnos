const horarios = require('./horarios');
const turnos = require('./turnos');

// @desc Llama a todas las funciones de este modulo, para ser importadas desde index.js
module.exports = function () {
    horarios();
    turnos();
};
