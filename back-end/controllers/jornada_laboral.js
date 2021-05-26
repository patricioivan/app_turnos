const Joi = require('@hapi/joi');
const JornadaLaboral = require('../models/JornadaLaboral');
const Horario = require('../models/Horario');
const addTimes = require('../utils/addTimes');

// @desc Guardar jornada para negocio
// @route POST /api/negocios/:negocio/jornada
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
        capacidadTurno: Joi.number().min(1).required(),
        duracionTurno: Joi.string().regex(pattern).required(),
    }).validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(422).json(error);
    }

    const {
        dia,
        inicio,
        fin,
        capacidadTurno,
        duracionTurno,
    } = req.body;

    if (inicio >= fin) {
        return res.status(400).json({
            codigo: 3201,
            mensaje: 'La hora de fin no puede ser anterior o igual a la hora de inicio',
        });
    }

    const jornadas = await JornadaLaboral.find({ 'negocio._id': negocio._id, dia });

    if (jornadas.length > 0) {
        const superpone = jornadas.some((jornada) => {
            if ((inicio < jornada.inicio && jornada.fin < fin)
                || (jornada.inicio < inicio && inicio < jornada.fin)
                || (jornada.inicio < fin && fin < jornada.fin)
                || (jornada.inicio === inicio)
                || (jornada.fin === fin)) {
                return true;
            }
            return false;
        });

        if (superpone) {
            return res.status(409).json({
                codigo: 3202,
                mensaje: 'Esta jornada se superpone con otra en el mismo dia',
            });
        }
    }

    const jornada = new JornadaLaboral({
        negocio: {
            _id: negocio._id,
        },
        dia,
        inicio,
        fin,
        capacidadTurno,
        duracionTurno,
    });

    await jornada.save();

    let i = inicio;

    let diaTraducido = '';

    if (dia === 'Monday') {
        diaTraducido = 'Lunes';
    } else if (dia === 'Tuesday') {
        diaTraducido = 'Martes';
    } else if (dia === 'Wednesday') {
        diaTraducido = 'Miercoles';
    } else if (dia === 'Thursday') {
        diaTraducido = 'Jueves';
    } else if (dia === 'Friday') {
        diaTraducido = 'Viernes';
    } else if (dia === 'Saturday') {
        diaTraducido = 'Sabado';
    }
    if (dia === 'Sunday') {
        diaTraducido = 'Domingo';
    }

    while (i < fin) {
        // eslint-disable-next-line prefer-template
        const finTurno = addTimes(i, duracionTurno);
        Horario.create({
            jornada,
            negocio: {
                _id: negocio._id,
            },
            dia,
            diaTraducido,
            inicio: i,
            fin: finTurno,
            capacidad: capacidadTurno,
        }).then(() => console.log('horario creado'));

        i = finTurno;
    }

    return res.json({});
};


// @desc Guardar jornada para negocio
// @route DELETE /api/negocios/:negocio/jornada/:jornada
// @public
exports.eliminar = async (req, res) => {
    const { error } = Joi.object({
        jornada: Joi.objectId().required(),
    }).validate(req.params, { abortEarly: false, allowUnknown: true });

    if (error) {
        return res.status(404).json({});
    }

    const jornada = await JornadaLaboral.findOne({ _id: req.params.jornada });

    await Horario.deleteMany({ 'jornada._id': jornada._id });

    await JornadaLaboral.deleteOne({ _id: req.params.jornada });

    return res.json({});
};

// @desc Trae lista de jornada laborales de un negocio
// @route GET /api/negocios/:negocio/jornadas
// @public
exports.traer = async (req, res) => {
    const { negocio } = req;

    const jornadas = await JornadaLaboral.find({ 'negocio._id': negocio._id });

    const sorter = {
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 7,
    };

    jornadas.sort((a, b) => {
        const day1 = a.dia.toLowerCase();
        const day2 = b.dia.toLowerCase();
        return sorter[day1] - sorter[day2];
    });

    return res.json({
        jornadas,
    });
};
