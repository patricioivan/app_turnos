const Joi = require('@hapi/joi');
const config = require('config');
const Rubro = require('../models/Rubro');
const Negocio = require('../models/Negocio');


// @desc Guardar nuevo rubro
// @route POST /api/rubros
// @public
exports.guardar = async (req, res) => {
    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
    }).validate(req.body, { abortEarly: true, allowUnknown: true });

    if (error) {
        return res.status(422).json(error);
    }

    const rubro = await Rubro.findOne({ nombre: req.body.nombre });
    if (rubro) {
        return res.status(409).json({
            codigo: 3001,
            mensaje: 'Ya existe un rubro con ese nombre',
        });
    }

    await Rubro.create({
        nombre: req.body.nombre,
    });

    return res.json({});
};

// @desc Listar todos los rubros
// @route GET /api/rubros
// @public
exports.index = async (req, res) => {
    const rubros = await Rubro.find().sort('nombre').select('_id nombre');

    return res.json({
        rubros,
    });
};

// @desc Traer negocios según rubro
// @route GET /api/rubros/:rubro/negocios?long=&lat
// @public
exports.negocios = async (req, res) => {
    const { error } = Joi.object({
        long: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-90).max(90).required(),
    }).validate(req.query, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { negocios } = req.rubro;


    if (negocios.length === 0) {
        return res.status(204).json({});
    }

    return res.json({
        negocios,
    });
};

// @desc Buscar negocios segun rubro
// @route GET /api/rubros/:rubro/negocios/buscar?long=&lat=&dato=
// @public
exports.buscarNegocios = async (req, res) => {
    const { error } = Joi.object({
        long: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-90).max(90).required(),
        dato: Joi.string().max(255).required(),
    }).validate(req.query, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { rubro } = req;

    let negocios = await Negocio.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [req.query.long, req.query.lat],
                },
                $maxDistance: config.get('negocios.MAX_DISTANCE'),
            },
        },
        'rubro._id': rubro._id,
        nombre: {
            $regex: req.query.dato,
            $options: 'i',
        },
    }).select('_id nombre imagen direccion location calificacion.promedio');

    if (negocios.length === 0) {
        return res.status(204).json({});
    }

    negocios = negocios.map((negocio) => negocio.hateoas(req));

    return res.json({
        negocios,
    });
};

// @desc elimina rubro
// @route DELETE /api/rubros/:rubro
// @public
exports.eliminar = async (req, res) => {
    const { rubro } = req;

    if (rubro.negocios.length > 0) {
        return res.status(422).json({
            mensaje: 'Existen negocios asociados a este rubro',
        });
    }

    await Rubro.deleteOne({ _id: rubro._id });

    return res.json({});
};
