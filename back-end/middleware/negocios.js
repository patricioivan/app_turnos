const Joi = require('@hapi/joi');
const Negocio = require('../models/Negocio');

// @desc Verifica si el recurso existe y lo agrega a req
exports.recurso = async function (req, res, next) {
    const { error } = Joi.object({
        negocio: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const negocio = await Negocio.findOne({ _id: req.params.negocio });
    if (!negocio) {
        return res.status(404).json({});
    }

    req.negocio = negocio;

    return next();
};
