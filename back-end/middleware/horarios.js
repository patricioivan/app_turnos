const Joi = require('@hapi/joi');
const Horario = require('../models/Horario');

// @desc Verificar si existe el recurso y lo agrega a req
exports.recurso = async function (req, res, next) {
    const { error } = Joi.object({
        horario: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const horario = await Horario.findOne({ _id: req.params.horario });
    if (!horario) {
        return res.status(404).json({});
    }

    req.horario = horario;

    return next();
};
