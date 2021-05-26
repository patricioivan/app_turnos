/* eslint-disable no-param-reassign */
const moment = require('moment-timezone');
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const Turno = require('../models/Turno');
const Acceso = require('../models/Acceso');
const Horario = require('../models/Horario');
const HorarioCompleto = require('../models/HorarioCompleto');
const addTimes = require('../utils/addTimes');

// @desc Guardar nuevo turno
// @route POST /api/negocios/:negocio/horarios/:horario/turnos
// @public
exports.guardar = async (req, res) => {
    const { negocio, horario } = req;

    const { error } = Joi.object({
        fecha: Joi.string().required(),
        capacidad: Joi.number().min(1).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const { fecha, capacidad } = req.body;

    if (negocio._id.toString() !== horario.negocio._id.toString()) {
        return res.status(409).json({
            codigo: 3302,
            mensaje: 'El turno no pertenece al negocio',
        });
    }

    let turno = await Turno.findOne({
        'usuario._id': req.cuenta._id,
        'horario._id': horario._id,
        fecha,
        activo: true,
    });

    if (turno) {
        return res.status(409).json({
            codigo: 3305,
            mensaje: 'Ya solicito un turno para este horario',
        });
    }


    const horarioCompleto = await HorarioCompleto.findOne({
        horario,
        fecha,
    });

    if (horarioCompleto.completo) {
        return res.status(409).json({
            mensaje: 'El Horario se encuentra completo',
        });
    }

    // eslint-disable-next-line operator-assignment
    horarioCompleto.capacidadDisponible = horarioCompleto.capacidadDisponible - capacidad;

    if (horarioCompleto.capacidadDisponible < 0) {
        return res.status(409).json({
            mensaje: 'No hay disponibilidad para la capacidad solicitada',
        });
    }

    if (horarioCompleto.capacidadDisponible === 0) {
        horarioCompleto.completo = true;
    }

    const ahora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');
    const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');


    if (horarioCompleto.fecha === hoy && horario.inicio < ahora) {
        return res.status(409).json({
            mensaje: 'Ya paso la hora de inicio del turno',
        });
    }

    turno = new Turno({
        empresa: negocio.empresa,
        negocio,
        horario,
        usuario: req.cuenta,
        capacidad,
        fecha,
    });

    console.log(turno.fecha);

    await horarioCompleto.save();
    await turno.save();

    await horarioCompleto.save();

    return res.json({});
};

// @desc Ver turnos activos
// @route GET /api/usuarios/turnos/activos
// @public
exports.activos = async (req, res) => {
    const hoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');

    const turnos = await Turno.find({
        usuario: req.cuenta,
        activo: true,
        expirado: false,
    }).select('_id negocio usuario activo expirado horario fecha capacidad').sort({ fecha: 1 });

    if (turnos.length === 0) {
        return res.status(204).json({});
    }

    turnos.forEach(async (turno) => {
        const expiraTurno = addTimes('00:15', turno.horario.inicio);
        if (turno.fecha === hoy && expiraTurno < moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm:ss')) {
            turno.activo = false;
            turno.expirado = true;
            await turno.save();
        } else if (turno.fecha < hoy) {
            turno.activo = false;
            turno.expirado = true;
            await turno.save();
        }
    });

    let turnosActivos = turnos.filter((turno) => turno.activo);

    turnosActivos = turnosActivos.map((turno) => turno.format());

    return res.json({
        turnosActivos,
    });
};

// @desc Ver turnos expirados
// @route GET /api/usuarios/turnos/expirados
// @public
exports.expirados = async (req, res) => {
    let turnos = await Turno.find({
        usuario: req.cuenta,
        activo: false,
        expirado: true,
    }).select('_id negocio usuario horario fecha').sort({ fecha: -1 });

    if (turnos.length === 0) {
        return res.status(204).json({});
    }

    turnos = turnos.map((turno) => turno.format());

    return res.json({
        turnos,
    });
};

// @desc Ver turnos usados
// @route GET /api/usuarios/turnos/usados
// @public
exports.usados = async (req, res) => {
    let turnos = await Turno.find({
        usuario: req.cuenta,
        activo: false,
        expirado: false,
        usado: true,
    }).select('_id negocio usuario horario fecha').sort({ fecha: -1 });

    if (turnos.length === 0) {
        return res.status(204).json({});
    }

    turnos = turnos.map((turno) => turno.format());

    return res.json({
        turnos,
    });
};

// @desc Ver turnos usados
// @route GET /api/usuarios/turnos/cancelados
// @public
exports.cancelados = async (req, res) => {
    let turnos = await Turno.find({
        usuario: req.cuenta,
        activo: false,
        expirado: false,
        usado: false,
    }).select('_id negocio usuario horario fecha').sort({ fecha: -1 });

    if (turnos.length === 0) {
        return res.status(204).json({});
    }

    turnos = turnos.map((turno) => turno.format());

    return res.json({
        turnos,
    });
};

// @desc Cancelar turno
// @route PUT /api/turnos/:turno/cancelar
// @public
exports.cancelar = async (req, res) => {
    const { turno } = req;

    if (toString(req.cuenta._id) !== toString(turno.usuario._id)) {
        return res.status(409).json({
            codigo: 3307,
            mensaje: 'Este turno no pertenece al usuario',
        });
    }

    if (!turno.activo) {
        return res.status(409).json({
            codigo: 3308,
            mensaje: 'Turno inactivo',
        });
    }

    turno.activo = false;
    await turno.save();

    const horarioCompleto = await HorarioCompleto.findOne({
        horario: turno.horario,
        fecha: turno.fecha,
    });

    horarioCompleto.capacidadDisponible += turno.capacidad;
    horarioCompleto.completo = false;
    await horarioCompleto.save();

    const horario = await Horario.findOne({
        _id: turno.horario,
    });

    horario.capacidadDisponible += turno.capacidad;
    await horario.save();

    return res.json({});
};

// @desc Validar turnos
// @route POST /api/turnos/validar
// @public
exports.validar = async (req, res) => {
    const { error } = Joi.object({
        turno: Joi.string().required(),
        negocio: Joi.objectId().required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.turno)) {
        return res.status(409).json({
            codigo: 3310,
            mensaje: 'Codigo invalido',
        });
    }

    const fechaHoy = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('YYYY/MM/DD');

    const turno = await Turno.findOne({
        _id: req.body.turno,
        'negocio._id': req.body.negocio,
        activo: true,
    });

    const hora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');

    // eslint-disable-next-line max-len
    if (!turno) {
        return res.status(409).json({
            codigo: 3310,
            mensaje: 'Turno no encontrado: es posible que no pertenezca a la sucursal',
        });
    }

    // eslint-disable-next-line max-len
    if (turno.fecha !== fechaHoy) {
        return res.status(409).json({
            codigo: 3310,
            mensaje: 'El turno no corresponde a la fecha',
        });
    }

    // eslint-disable-next-line max-len
    if (hora > turno.horario.fin) {
        return res.status(409).json({
            codigo: 3310,
            mensaje: 'Ya paso la hora de fin de turno',
        });
    }

    // eslint-disable-next-line max-len
    if (hora < turno.horario.inicio) {
        return res.status(409).json({
            codigo: 3310,
            mensaje: 'El turno aún no ha comenzado',
        });
    }


    await Acceso.create({
        empresa: turno.empresa,
        negocio: turno.negocio,
        usuario: turno.usuario,
        fecha: moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('DD/MM/YYYY HH:mm:ss'),
    });

    turno.activo = false;
    turno.usado = true;
    await turno.save();

    return res.json({});
};
