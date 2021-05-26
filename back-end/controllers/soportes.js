const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Soporte = require('../models/Soporte');

// @desc Registrar usuario de soporte
// @route POST /api/soportes
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
        apellido: Joi.string().max(255).required(),
        documento: Joi.string().max(255).required(),
        celular: Joi.string().max(255).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        admin: Joi.boolean().required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let soporte = await Soporte.findOne({ documento: req.body.documento });
    if (soporte) {
        return res.status(409).json({
            codigo: 1002,
            mensaje: 'Ya existe una cuenta con ese documento',
        });
    }

    soporte = await Soporte.findOne({ celular: req.body.celular });
    if (soporte) {
        return res.status(409).json({
            codigo: 1003,
            mensaje: 'Ya existe una cuenta con ese celular',
        });
    }

    soporte = await Soporte.findOne({ email: req.body.email });
    if (soporte) {
        return res.status(409).json({
            codigo: 1001,
            mensaje: 'Ya existe una cuenta con esa direccion de email',
        });
    }

    soporte = new Soporte({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        celular: req.body.celular,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        admin: req.body.admin,
    });
    await soporte.save();

    return res.json({
        soporte,
    });
};

// @desc Login para usuarios de soporte
// @route POST /api/soportes/login
// @public
exports.login = async (req, res) => {
    const { error } = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const soporte = await Soporte.findOne({ email: req.body.email });
    if (!soporte) {
        return res.status(409).json({
            codigo: 2001,
            mensaje: 'No se encontro una cuenta con esa direccion de email',
        });
    }

    const passCorrecta = await bcrypt.compare(req.body.password, soporte.password);
    if (!passCorrecta) {
        return res.status(409).json({
            codigo: 2002,
            mensaje: 'Usuario o password incorrectos',
        });
    }

    if (!soporte.activo) {
        return res.status(409).json({
            codigo: 2003,
            mensaje: 'Cuenta inactiva',
        });
    }

    const token = soporte.generateToken();

    return res.json({
        token,
    });
};

// @desc Buscar usuario soport
// @route GET /api/soportes/?dato=
// @public
exports.buscar = async (req, res) => {
    const { error } = Joi.object({
        dato: Joi.string().allow(null, ''),
    }).validate(req.query, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(400).send({ error });
    }

    const { dato } = req.query;

    let soportes;

    if (dato) {
        soportes = await Soporte.find({
            $or: [
                {
                    nombre: {
                        $regex: dato,
                        $options: 'i',
                    },
                },
                {
                    apellido: {
                        $regex: dato,
                        $options: 'i',
                    },
                },
                {
                    email: {
                        $regex: dato,
                        $options: 'i',
                    },
                },
            ],
        });
    } else {
        soportes = await Soporte.find();
    }

    if (soportes.length === 0) {
        return res.status(404).send({
            mensaje: 'No se encontraron resultados',
        });
    }

    return res.status(200).send({
        soportes,
    });
};

// @desc Traer los datos del usuario de soporte
// @route GET /api/soportes/:soporte
// @public
exports.cuenta = async (req, res) => {
    const { error } = Joi.object({
        soporte: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const soporte = await Soporte.findOne({ _id: req.params.soporte });
    if (!soporte) {
        return res.status(404).json({});
    }

    return res.json({
        soporte,
    });
};
