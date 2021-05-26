const Joi = require('@hapi/joi');
const Horario = require('../models/Horario');

// @desc Guardar horario para negocio
// @route POST /api/negocios/:negocio/horarios
// @public
exports.guardar = async (req, res) => {
    const { negocio } = req;

    // Time pattern
    const pattern = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

    const { error } = Joi.object({
        dia: Joi.string().valid(
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
        ).required(),
        inicio: Joi.string().regex(pattern).required(),
        fin: Joi.string().regex(pattern).required(),
        capacidad: Joi.number().min(1).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const {
        dia,
        inicio,
        fin,
        capacidad,
    } = req.body;

    if (inicio >= fin) {
        return res.status(400).json({
            codigo: 3201,
            mensaje: 'La hora de fin no puede ser anterior o igual a la hora de inicio',
        });
    }

    const horarios = await Horario.find({ 'negocio._id': negocio._id, dia });

    if (horarios.length > 0) {
        const superpone = horarios.some((horario) => {
            if ((inicio < horario.inicio && horario.fin < fin)
                || (horario.inicio < inicio && inicio < horario.fin)
                || (horario.inicio < fin && fin < horario.fin)
                || (horario.inicio === inicio)
                || (horario.fin === fin)) {
                return true;
            }
            return false;
        });

        if (superpone) {
            return res.status(409).json({
                codigo: 3202,
                mensaje: 'Este turno se superpone con otro en el mismo dia',
            });
        }
    }

    await Horario.create({
        negocio: {
            _id: negocio._id,
        },
        dia,
        inicio,
        fin,
        capacidad,
    });

    return res.json({});
};
