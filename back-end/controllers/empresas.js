/* eslint-disable max-len */
/* eslint-disable operator-assignment */
const Joi = require('@hapi/joi');
const bcrypt = require('bcryptjs');
const Empresa = require('../models/Empresa');
const Turno = require('../models/Turno');
const Negocio = require('../models/Negocio');

// Upload image to S3
const upload = require('../startup/file_upload');

const singleUpload = upload.single('image');

// @desc Crear nueva cuenta empresa
// @route POST /api/empresas
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
        razonSocial: Joi.string().max(255).required(),
        cuil: Joi.number().required(),
        provincia: Joi.string().max(255).required(),
        localidad: Joi.string().max(255).required(),
        calle: Joi.string().max(255).required(),
        numero: Joi.number().required(),
        departamento: Joi.string().max(255).allow('').required(),
        longitude: Joi.number().min(-180).max(180).required(),
        latitude: Joi.number().min(-90).max(90).required(),
        email: Joi.string().email().max(255).required(),
        password: Joi.string().min(8).max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let empresa = await Empresa.findOne({ razonSocial: req.body.razonSocial });
    if (empresa) {
        return res.status(409).json({
            codigo: 1004,
            mensaje: 'Ya existe una cuenta con esa razon social',
        });
    }

    empresa = await Empresa.findOne({ cuil: req.body.cuil });
    if (empresa) {
        return res.status(409).json({
            codigo: 1005,
            mensaje: 'Ya existe una cuenta con ese numero de cuil',
        });
    }

    empresa = await Empresa.findOne({ email: req.body.email });
    if (empresa) {
        return res.status(409).json({
            codigo: 1001,
            mensaje: 'Ya existe una cuenta con esa direccion de email',
        });
    }

    empresa = new Empresa({
        nombre: req.body.nombre,
        razonSocial: req.body.razonSocial,
        cuil: req.body.cuil,
        direccion: {
            provincia: req.body.provincia,
            localidad: req.body.localidad,
            calle: req.body.calle,
            numero: req.body.numero,
            departamento: req.body.departamento,
        },
        location: {
            coordinates: [req.body.longitude, req.body.latitude],
        },
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        imagen: 'https://unsta-tesis.s3.amazonaws.com/9def310d-83a3-4440-9ed5-fe2b0844cf64.jpg',
    });

    await empresa.save();

    return res.json({
        empresa,
    });
};

// @desc Buscar empresas
// @route GET /api/empresas/:dato
// @public
exports.buscar = async (req, res) => {
    const { error } = Joi.object({
        dato: Joi.string().allow(null, ''),
    }).validate(req.query, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(400).send({ error });
    }

    const { dato } = req.query;

    let empresas;

    if (dato) {
        empresas = await Empresa.find({
            $or: [
                {
                    nombre: {
                        $regex: dato,
                        $options: 'i',
                    },
                },
                {
                    razonSocial: {
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
        empresas = await Empresa.find();
    }

    if (empresas.length === 0) {
        return res.status(404).send({
            mensaje: 'No se encontraron resultados',
        });
    }

    return res.status(200).send({
        empresas,
    });
};

// @desc Login para empresas
// @route POST /api/empresas/login
// @public
exports.login = async (req, res) => {
    const { error } = Joi.object({
        email: Joi.string().email().max(255).required(),
        password: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const empresa = await Empresa.findOne({ email: req.body.email });
    if (!empresa) {
        return res.status(409).json({
            codigo: 2001,
            mensaje: 'No se encontro una cuenta con esa direccion de email',
        });
    }

    const passCorrecta = await bcrypt.compare(req.body.password, empresa.password);
    if (!passCorrecta) {
        return res.status(409).json({
            codigo: 2002,
            mensaje: 'Usuario o password incorrectos',
        });
    }

    const token = empresa.generateToken();

    return res.json({
        token,
    });
};

// @desc Ver datos de empresa
// @route GET /api/empresas/cuenta
// @public
exports.cuenta = async (req, res) => {
    const { empresa } = req;

    return res.json({
        empresa,
    });
};

// @desc Ver negocios de empresa
// @route GET /api/empresas/:empresa/negocios
// @public
exports.negocios = async (req, res) => {
    const { empresa } = req;
    const negocios = await Negocio.find({ empresa });

    if (negocios.length === 0) {
        return res.status(204).json({});
    }

    return res.json({
        negocios,
    });
};

// @desc Ver negocios de empresa
// @route GET /api/empresas/:empresa/negocios
// @public
exports.negociosPropios = async (req, res) => {
    const { cuenta } = req;
    const negocios = await Negocio.find({ 'empresa._id': cuenta._id });

    return res.json({
        negocios,
    });
};

// @desc Traer los datos del usuario
// @route GET /api/empresas/cuenta-token
// @public
exports.cuentaToken = async (req, res) => {
    const { cuenta } = req;
    const empresa = await Empresa.findOne({ _id: cuenta._id }).select('-password');
    if (!empresa) {
        return res.status(404).json({});
    }

    return res.json({
        empresa,
    });
};

// @desc Guardar imagen de una empresa
// @route PUT /api/empresas/:empresa/imagen
// @public
exports.guardarImagen = async (req, res) => {
    const { empresa } = req;
    req.nombreArchivo = `empresas/${empresa.razonSocial}`;

    return singleUpload(req, res, async (err) => {
        if (!req.file) {
            return res.status(422).json({
                mensaje: 'Imagen requerida',
            });
        }

        if (err) {
            return res.status(422).json({
                codigo: 1500,
                mensaje: 'Imagen requerida: formato validos: PNG, JPEG o JPG',
                err,
            });
        }

        empresa.imagen = req.file.location;
        await empresa.save();
        const negocios = await Negocio.find({ empresa });
        negocios.forEach(async (negocio) => {
            // eslint-disable-next-line no-param-reassign
            negocio.imagen = empresa.imagen;
            await negocio.save();
        });
        return res.json({});
    });
};

exports.traerTurnosActivos = async (req, res) => {
    const { cuenta } = req;

    const turnos = await Turno.find({ 'empresa._id': cuenta._id, activo: true }).sort({ fecha: -1 });

    return res.json({
        turnos,
    });
};

exports.estadisticas = async (req, res) => {
    const { cuenta } = req;

    const cantidadTurnosTotal = await Turno.find({ 'empresa._id': cuenta._id }).countDocuments();
    const cantidadTurnosActivos = await Turno.find({ 'empresa._id': cuenta._id, activo: true }).countDocuments();
    const cantidadTurnosExpirados = await Turno.find({ 'empresa._id': cuenta._id, expirado: true }).countDocuments();
    const cantidadTurnosUsados = await Turno.find({ 'empresa._id': cuenta._id, usado: true }).countDocuments();
    const cantidadTurnosCancelados = await Turno.find({
        'empresa._id': cuenta._id,
        activo: false,
        usado: false,
        expirado: false,
    }).countDocuments();

    const negocios = await Negocio.find({ 'empresa._id': cuenta._id }).select('nombre direccion calificacion');

    const empresaEstadisticas = {
        calificacion: {
            cantidadOpiniones: 0,
            cantidadPuntos: 0,
            promedio: 0,
        },
    };

    // eslint-disable-next-line no-restricted-syntax
    for (const negocio of negocios) {
        empresaEstadisticas.calificacion.cantidadOpiniones = empresaEstadisticas.calificacion.cantidadOpiniones + negocio.calificacion.cantidadOpiniones;
        empresaEstadisticas.calificacion.cantidadPuntos = empresaEstadisticas.calificacion.cantidadPuntos + negocio.calificacion.cantidadPuntos;
    }

    empresaEstadisticas.calificacion.promedio = empresaEstadisticas.calificacion.cantidadPuntos / empresaEstadisticas.calificacion.cantidadOpiniones;

    const estadisticas = {
        cantidadTurnosTotal,
        cantidadTurnosActivos,
        cantidadTurnosUsados,
        cantidadTurnosExpirados,
        cantidadTurnosCancelados,
        negocios,
        empresaEstadisticas,
    };

    return res.status(200).json({
        estadisticas,
    });
};
