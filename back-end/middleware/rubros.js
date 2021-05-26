const Joi = require('@hapi/joi');
const Rubro = require('../models/Rubro');

// @desc Verifica si el recurso existe y los agrega a req
exports.recurso = async function (req, res, next) {
    const { error } = Joi.object({
        rubro: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const rubro = await Rubro.findOne({ _id: req.params.rubro });
    if (!rubro) {
        return res.status(404).json({});
    }

    req.rubro = rubro;

    return next();
};
