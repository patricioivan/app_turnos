const config = require('config');
const Joi = require('@hapi/joi');
const Empresa = require('../models/Empresa');

// @desc Verifica si el token es correcto para cuenta EMPRESA
exports.cuenta = async function (req, res, next) {
    if (req.cuenta.tipo !== config.get('cuentas.tipos.EMPRESA')) {
        return res.status(403).json({
            codigo: 5003,
            mensaje: 'Se require cuenta EMPRESA',
        });
    }

    const empresa = await Empresa.findOne({ _id: req.cuenta._id });
    if (!empresa) {
        return res.status(409).json({
            codigo: 9002,
            mensaje: 'Cuenta no encontrada',
        });
    }

    return next();
};

// @desc Verfica si el recurso existe y lo agrega a req
exports.recurso = async function (req, res, next) {
    const { error } = Joi.object({
        empresa: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const empresa = await Empresa.findOne({ _id: req.params.empresa });
    if (!empresa) {
        return res.status(404).json({});
    }

    req.empresa = empresa;

    return next();
};
