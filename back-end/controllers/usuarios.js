const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const Favorito = require('../models/Favorito');

// @desc Registrar usuario
// @route POST /api/usuarios
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        nombre: Joi.string().max(255).required(),
        apellido: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let usuario = await Usuario.findOne({ email: req.body.email });
    if (usuario) {
        return res.status(409).json({
            codigo: 1001,
            mensaje: 'Ya existe una cuenta con esa direccion de email',
        });
    }

    usuario = new Usuario({
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
    });

    await usuario.save();

    const token = usuario.generateToken();

    return res.json({
        token,
    });
};

// @desc Traer los datos del usuario
// @route GET /api/usuarios/cuenta
// @public
exports.cuenta = async (req, res) => {
    const { cuenta } = req;
    const usuario = await Usuario.findOne({ _id: cuenta._id }).select('-password');
    if (!usuario) {
        return res.status(404).json({});
    }

    return res.json({
        usuario,
    });
};

// @desc Actualizar datos del usuario
// @route PUT /api/usuarios/cuenta
// @public
exports.actualizar = async (req, res) => {
    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
        apellido: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const usuario = await Usuario.findOne({ _id: req.cuenta._id }).select('-password');
    if (!usuario) {
        return res.status(404);
    }

    usuario.nombre = req.body.nombre;
    usuario.apellido = req.body.apellido;
    await usuario.save();

    const token = usuario.generateToken();

    return res.json({
        token,
    });
};

// @desc Login para usuarios
// @route POST /api/usuarios/login
// @public
exports.login = async (req, res) => {
    const { error } = Joi.object({
        email: Joi.string().max(255).email().required(),
        password: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const usuario = await Usuario.findOne({ email: req.body.email });
    if (!usuario) {
        return res.status(409).json({
            codigo: 2001,
            mensaje: 'No se encontro una cuenta con esa direccion de email',
        });
    }

    const passCorrecta = await bcrypt.compare(req.body.password, usuario.password);
    if (!passCorrecta) {
        return res.status(409).json({
            codigo: 2002,
            mensaje: 'Usuario o password incorrectos',
        });
    }

    const token = usuario.generateToken();

    return res.json({
        token,
    });
};

// @desc Trae todos los favoritos del usuario
// @route GET /api/usuarios/favoritos
// @public
exports.getFavoritos = async (req, res) => {
    const { cuenta } = req;

    const favoritos = await Favorito.find({
        'usuario._id': cuenta._id,
    }).select('negocio');

    return res.status(200).json({
        favoritos,
    });
};
