const express = require('express');
const error = require('../middleware/error');

const api = require('../routes/api');
const usuarios = require('../routes/usuarios');
const soportes = require('../routes/soportes');
const empresas = require('../routes/empresas');
const rubros = require('../routes/rubros');
const negocios = require('../routes/negocios');
const operarios = require('../routes/operarios');
const turnos = require('../routes/turnos');
const empresasUploadImagen = require('../routes/empresas_file_upload');

module.exports = function (app) {
    app.use(express.json());

    app.use('/api', api);
    app.use('/api/usuarios', usuarios);
    app.use('/api/soportes', soportes);
    app.use('/api/empresas', empresas);
    app.use('/api/rubros', rubros);
    app.use('/api/negocios', negocios);
    app.use('/api/operarios', operarios);
    app.use('/api/turnos', turnos);
    app.use('/api/empresas', empresasUploadImagen);

    app.use(error);
};
