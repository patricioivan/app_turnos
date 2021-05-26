const Joi = require('@hapi/joi');
const Turno = require('../models/Turno');

// @desc Verifica si el recurso existe y lo agrega al req
exports.recurso = async (req, res, next) => {
    const { error } = Joi.object({
        turno: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const turno = await Turno.findOne({ _id: req.params.turno });
    if (!turno) {
        return res.status(404).json({});
    }

    req.turno = turno;

    return next();
};
