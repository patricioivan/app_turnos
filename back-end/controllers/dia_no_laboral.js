const Joi = require('@hapi/joi');
const moment = require('moment-timezone');
const DiaNoLaboral = require('../models/DiaNoLaboral');

// @desc Registrar dia no laboral
// @route POST /api/negocio/:negocio/dias-no-laborales
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        fecha: Joi.string().required(),
        motivo: Joi.string().max(1000).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { negocio } = req;
    const { fecha, motivo } = req.body;

    const dia = await DiaNoLaboral.findOne({ 'negocio._id': negocio._id, fecha });

    if (dia) {
        return res.status(409).json({
            mensaje: 'Ya se registro ese dia no laborable',
        });
    }

    const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');

    if (fecha < hoy) {
        return res.status(409).json({
            mensaje: 'La fecha elegida no puede ser anterior a hoy',
        });
    }

    await DiaNoLaboral.create({
        'negocio._id': negocio._id,
        fecha,
        motivo,
    });

    return res.json({});
};

// @desc trae dias no laborales de un negocio
// @route GET /api/negocio/:negocio/dias-no-laborales
// @public
exports.traer = async (req, res) => {
    const { negocio } = req;

    const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');

    const dias = await DiaNoLaboral.find({ 'negocio._id': negocio._id }).where('fecha').gte(hoy).sort('fecha');

    return res.json({
        dias,
    });
};

// @desc elimina dias no laborales de un negocio
// @route GET /api/negocio/:negocio/dias-no-laborales/:dia
// @public
exports.eliminar = async (req, res) => {
    const { error } = Joi.object({
        dia: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });


    if (error) {
        return res.status(404).json({});
    }

    const { dia } = req.params;

    const existe = await DiaNoLaboral.findOne({ _id: dia });
    if (!existe) {
        return res.status(404).json({
            mensaje: 'Fecha no encontrada',
        });
    }

    await DiaNoLaboral.deleteOne({ _id: dia });

    return res.json({});
};
