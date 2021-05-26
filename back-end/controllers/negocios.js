/* eslint-disable no-param-reassign */
const Joi = require('@hapi/joi');
const config = require('config');
const moment = require('moment-timezone');
const Negocio = require('../models/Negocio');
const Rubro = require('../models/Rubro');
const Horario = require('../models/Horario');
const Rating = require('../models/Rating');
const Favorito = require('../models/Favorito');
const DiaNoLaboral = require('../models/DiaNoLaboral');
const HorarioCompleto = require('../models/HorarioCompleto');
const Turno = require('../models/Turno');
const addTimes = require('../utils/addTimes');


// @desc Guardar nuevo negocio para empresa
// @route POST /api/empresas/:empresa/negocios
// @public
exports.guardar = async (req, res) => {
    const { empresa } = req;

    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
        rubros: Joi.array().required(),
        provincia: Joi.string().max(255).required(),
        localidad: Joi.string().max(255).required(),
        calle: Joi.string().max(255).required(),
        numero: Joi.number().required(),
        departamento: Joi.string().max(255).allow('').required(),
        longitude: Joi.number().min(-180).max(180).required(),
        latitude: Joi.number().min(-90).max(90).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let negocio = await Negocio.findOne({
        'empresa._id': empresa._id,
        nombre: `${empresa.nombre} - ${req.body.nombre}`,
    });

    if (negocio) {
        return res.status(409).json({
            codigo: 3101,
            mensaje: 'Ya existe un negocio con ese nombre',
        });
    }

    const rubrosNegocio = await Promise.all(req.body.rubros.map(async (reqRubro) => {
        const rubro = await Rubro.findOne({ _id: reqRubro._id }).select('_id nombre');
        return rubro;
    }));

    negocio = new Negocio({
        empresa: {
            _id: empresa._id,
        },
        nombre: `${empresa.nombre} - ${req.body.nombre}`,
        rubros: rubrosNegocio,
        imagen: empresa.imagen,
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
    });

    await negocio.save();

    req.body.rubros.forEach(async (reqRubro) => {
        const rubro = await Rubro.findOne({ _id: reqRubro._id });
        rubro.negocios.push(negocio);
        await rubro.save();
    });

    return res.json({
        negocio,
    });
};

// @desc Ver negocio
// @route GET /api/negocios/:negocio
// @public
exports.ver = async (req, res) => {
    const { negocio } = req;

    return res.json({
        negocio,
    });
};

// @route GET /api/negocios/:negocio/editar
// @public
exports.verEditar = async (req, res) => {
    const { negocio } = req;

    return res.json({
        negocio: {
            nombre: negocio.nombre,
            provincia: negocio.direccion.provincia,
            localidad: negocio.direccion.localidad,
            calle: negocio.direccion.calle,
            numero: negocio.direccion.numero,
            departamento: negocio.direccion.departamento,
            rubros: negocio.rubros,
            coordinates: negocio.coordinates,
        },
    });
};

// @desc Traer negocios cercanos
// @route GET /api/negocios/cercanos?long=&lat=
// @public
exports.cercanos = async (req, res) => {
    const { error } = Joi.object({
        long: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-90).max(90).required(),
    }).validate(req.query, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

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
    }).select('_id nombre imagen direccion location calificacion.promedio');

    if (negocios.length === 0) {
        return res.status(204).json({});
    }

    negocios = negocios.map((negocio) => negocio.hateoas(req));

    return res.json({
        negocios,
    });
};

// @desc Buscar negocios
// @route GET /api/negocios/buscar?long=&lat=&dato=
// @public
exports.buscar = async (req, res) => {
    const params = req.query;
    const { error } = Joi.object({
        long: Joi.number().min(-180).max(180).required(),
        lat: Joi.number().min(-90).max(90).required(),
        dato: Joi.string().max(255).required(),
    }).validate(params, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let negocios = await Negocio.find({
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [params.long, params.lat],
                },
                $maxDistance: config.get('negocios.MAX_DISTANCE'),
            },
        },
        $or: [
            {
                nombre: {
                    $regex: params.dato,
                    $options: 'i',
                },
            },
        ],
    }).select('_id nombre imagen direccion location calificacion.promedio');

    if (negocios.length === 0) {
        return res.status(204).json({});
    }

    negocios = negocios.map((negocio) => negocio.hateoas(req));

    return res.json({
        negocios,
    });
};

// @desc Traer negocios y horarios segun dia
// @route GET /api/negocios/:negocio/horarios
// @public
exports.verNegocioHorario = async (req, res) => {
    const { negocio } = req;

    // eslint-disable-next-line arrow-body-style
    let horarios = await Horario.find({
        'negocio._id': negocio._id,
        dia: moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('dddd'),
    }).sort('inicio');

    horarios = horarios.map((horario) => {
        const newHorario = horario.hateoas(req);

        const ahora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');
        delete newHorario.completo;
        if (ahora < horario.inicio && horario.completo) {
            newHorario.estado = 'COMPLETO';
        } else if (ahora < horario.inicio) {
            newHorario.estado = 'ABIERTO';
        } else if (horario.inicio < ahora && ahora < horario.fin) {
            newHorario.estado = 'ACTIVO';
        } else {
            newHorario.estado = 'CERRADO';
        }
        return newHorario;
    });

    const newNegocio = {
        _id: negocio._id,
        nombre: negocio.nombre,
        direccion: negocio.direccion,
        calificacion: negocio.calificacion,
        location: negocio.location,
        horarios,
    };

    return res.json({
        negocio: newNegocio,
    });
};

// @desc Traer negocios y horarios segun dia
// @route GET /api/negocios/:negocio/horarios
// @public
exports.verTodosHorarios = async (req, res) => {
    const { negocio } = req;

    // eslint-disable-next-line arrow-body-style
    let horarios = await Horario.find({
        'negocio._id': negocio._id,
    }).sort('inicio');

    horarios = horarios.map((horario) => {
        const newHorario = horario.hateoas(req);

        const ahora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');
        delete newHorario.completo;
        if (ahora < horario.inicio && horario.completo) {
            newHorario.estado = 'COMPLETO';
        } else if (ahora < horario.inicio) {
            newHorario.estado = 'ABIERTO';
        } else if (horario.inicio < ahora && ahora < horario.fin) {
            newHorario.estado = 'ACTIVO';
        } else {
            newHorario.estado = 'CERRADO';
        }
        return newHorario;
    });

    return res.json({
        horarios,
    });
};

// @desc Calificar Negocio
// @route POST /api/negocios/:negocio/rating
// @public
exports.rating = async (req, res) => {
    const { negocio, cuenta, body } = req;

    const { error } = Joi.object({
        rating: Joi.number().min(0).max(5).required(),
        comentario: Joi.string().max(255).allow(null, ''),
    }).validate(body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    let rating = await Rating.findOne({
        'usuario._id': cuenta._id,
        'negocio._id': negocio._id,
    });

    if (rating) {
        return res.status(409).json({
            codigo: 3333,
            mensaje: 'Ya dejaste una calificación en este negocio',
        });
    }

    negocio.calificacion.cantidadOpiniones += 1;
    negocio.calificacion.cantidadPuntos += req.body.rating;
    // eslint-disable-next-line max-len
    negocio.calificacion.promedio = negocio.calificacion.cantidadPuntos / negocio.calificacion.cantidadOpiniones;
    await negocio.save();

    rating = new Rating({
        usuario: {
            _id: cuenta._id,
            email: cuenta.email,
            nombre: cuenta.nombre,
            apellido: cuenta.apellido,
        },
        negocio: {
            _id: negocio._id,
        },
        rating: body.rating,
        comentario: body.comentario,
    });
    await rating.save();

    return res.status(200).json({});
};

// @desc Trae calificaciones del Negocio
// @route GET /api/negocios/:negocio/rating
// @public
exports.getRatings = async (req, res) => {
    const { negocio } = req;

    const ratings = await Rating.find({ 'negocio._id': negocio._id });

    return res.status(200).json({
        ratings,
    });
};

// @desc Agrega negocio a favoritos del usuario
// @route POST /api/negocios/:negocio/favoritos
// @public
exports.addFavoritos = async (req, res) => {
    const { cuenta, negocio } = req;

    let favorito = await Favorito.findOne({
        'usuario._id': cuenta._id,
        'negocio._id': negocio._id,
    });

    if (favorito) {
        return res.status(409).json({
            codigo: 3333,
            mensaje: 'Este negocio ya se encuentra en favoritos',
        });
    }

    favorito = new Favorito({
        'usuario._id': cuenta._id,
        negocio,
    });
    await favorito.save();

    return res.status(200).json({
        mensaje: 'Se agrego el negocio a favoritos',
    });
};

// @desc Elimina negocio de favoritos del usuario
// @route DELETE /api/negocios/:negocio/favoritos
// @public
exports.removeFavoritos = async (req, res) => {
    const { cuenta, negocio } = req;

    const favorito = await Favorito.findOne({
        'usuario._id': cuenta._id,
        'negocio._id': negocio._id,
    });

    if (!favorito) {
        return res.status(409).json({
            codigo: 3333,
            mensaje: 'Este negocio no se encuentra en favoritos',
        });
    }

    await Favorito.deleteOne({ _id: favorito._id });

    return res.status(200).json({
        mensaje: 'Se eliminó el negocio de favoritos',
    });
};

// @desc Traer negocios y horarios segun dia y se fija en dia no laborales
// @route GET /api/negocios/:negocio/horarios
// @public
exports.traerHorariosSegunDiaSeleccionado = async (req, res) => {
    const { negocio } = req;

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
        fecha: Joi.string().required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { fecha, dia } = req.body;

    const fechaNoLaboral = await DiaNoLaboral.findOne({ 'negocio._id': negocio._id, fecha });

    if (fechaNoLaboral) {
        return res.status(409).json({
            mensaje: 'El negocio no trabaja este dia',
        });
    }

    // eslint-disable-next-line arrow-body-style
    let horarios = await Horario.find({
        'negocio._id': negocio._id,
        dia,
    }).sort('inicio');

    horarios = await Promise.all(horarios.map(async (horario) => {
        const newHorario = Object.assign(horario);

        let horarioCompleto = await HorarioCompleto.findOne({ 'horario._id': horario._id, fecha });

        if (!horarioCompleto) {
            horarioCompleto = new HorarioCompleto({
                fecha,
                horario,
                capacidadDisponible: horario.capacidad,
            });

            await horarioCompleto.save();
        }

        delete newHorario.completo;
        if (horarioCompleto && horarioCompleto.completo) {
            newHorario.completo = true;
            newHorario.estado = 'COMPLETO';
        } else {
            newHorario.estado = 'HAY LUGAR';
        }

        newHorario.capacidadDisponible = horarioCompleto.capacidadDisponible;
        return newHorario;
    }));


    return res.json({
        horarios,
    });
};

exports.traerOtrasSucursales = async (req, res) => {
    const { negocio } = req;

    const negocios = await Negocio.find({
        empresa: negocio.empresa,
    });

    return res.json({
        negocios,
    });
};

exports.traerTurnosActivos = async (req, res) => {
    const { negocio } = req;

    let turnos = await Turno.find({ 'negocio._id': negocio._id, activo: true }).sort({ fecha: 1 });

    const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');

    turnos.forEach(async (turno) => {
        const expiraTurno = addTimes('00:15', turno.horario.inicio);
        if (turno.fecha <= hoy && expiraTurno < moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm')) {
            turno.activo = false;
            turno.expirado = true;
            await turno.save();
        }
    });

    turnos = await Turno.find({ 'negocio._id': negocio._id, activo: true }).sort({ fecha: 1 });


    return res.json({
        turnos,
    });
};

// @desc Guardar nuevo negocio para empresa
// @route POST /api/empresas/:empresa/negocios
// @public
exports.editar = async (req, res) => {
    const { negocio } = req;

    const { error } = Joi.object({
        nombre: Joi.string().max(255).required(),
        rubros: Joi.array().required(),
        provincia: Joi.string().max(255).required(),
        localidad: Joi.string().max(255).required(),
        calle: Joi.string().max(255).required(),
        numero: Joi.number().required(),
        departamento: Joi.string().max(255).allow('').required(),
        longitude: Joi.number().min(-180).max(180).required(),
        latitude: Joi.number().min(-90).max(90).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    negocio.rubros.forEach(async (reqRubro) => {
        const rubro = await Rubro.findOne({ _id: reqRubro._id });
        rubro.negocios.id(negocio._id).remove();
        await rubro.save();
    });

    const rubrosNegocio = await Promise.all(req.body.rubros.map(async (reqRubro) => {
        const rubro = await Rubro.findOne({ _id: reqRubro._id }).select('_id nombre');
        return rubro;
    }));

    negocio.nombre = req.body.nombre;
    negocio.rubros = rubrosNegocio;
    negocio.direccion.provincia = req.body.provincia;
    negocio.direccion.localidad = req.body.localidad;
    negocio.direccion.calle = req.body.calle;
    negocio.direccion.numero = req.body.numero;
    negocio.direccion.departamento = req.body.departamento;
    negocio.location.coordinates = [req.body.longitude, req.body.latitude];

    await negocio.save();


    req.body.rubros.forEach(async (reqRubro) => {
        const rubro = await Rubro.findOne({ _id: reqRubro._id });
        rubro.negocios.push(negocio);
        await rubro.save();
    });

    return res.json({
        negocio,
    });
};
