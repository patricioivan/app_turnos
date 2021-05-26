const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Operario = require('../models/Operario');

// @desc Registrar cuenta Operario para Empresas
// @route POST /api/empresas/:empresa/operarios
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        password: Joi.string().min(8).max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { empresa } = req;

    const operario = await Operario.findOne({ empresa });
    if (operario) {
        return res.status(409).json({
            codigo: 3401,
            mensaje: 'Esta empresa ya posee una cuenta operario',
        });
    }

    await Operario.create({
        empresa,
        password: await bcrypt.hash(req.body.password, 10),
    });

    return res.json({});
};

// @desc Login para cuenta OPERARIO
// @route POST /api/operarios/login
// @public
exports.login = async (req, res) => {
    const { error } = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const operario = await Operario.findOne({ 'empresa.email': req.body.email });
    if (!operario) {
        return res.status(409).json({
            codigo: 2001,
            mensaje: 'No se encontró una cuenta con esa dirección de email',
        });
    }

    const passCorrecta = await bcrypt.compare(req.body.password, operario.password);
    if (!passCorrecta) {
        return res.status(409).json({
            codigo: 2002,
            mensaje: 'Usuario o password incorrectos',
        });
    }

    if (!operario.activo) {
        return res.status(409).json({
            codigo: 2003,
            mensaje: 'Cuenta inactiva',
        });
    }

    const token = operario.generateToken();

    return res.json({
        token,
    });
};
