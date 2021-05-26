const mongoose = require('mongoose');
const moment = require('moment-timezone');

const schema = new mongoose.Schema({
    empresa: new mongoose.Schema({

    }),
    negocio: new mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        direccion: {
            provincia: {
                type: String,
                maxlength: 255,
                trim: true,
                required: true,
            },
            localidad: {
                type: String,
                maxlength: 255,
                trim: true,
                required: true,
            },
            calle: {
                type: String,
                maxlength: 255,
                trim: true,
                required: true,
            },
            numero: {
                type: Number,
                maxlength: 255,
                trim: true,
                required: true,
            },
            departamento: {
                type: String,
                maxlength: 255,
                default: '',
                trim: true,
                required: false,
            },
        },
    }),
    horario: new mongoose.Schema({
        dia: {
            type: String,
            enum: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
            ],
            required: true,
        },
        diaTraducido: {
            type: String,
            default: '',
            trim: true,
            index: true,
            required: true,
        },
        inicio: {
            type: String,
            trim: true,
            required: true,
        },
        fin: {
            type: String,
            trim: true,
            required: true,
        },
    }),
    usuario: new mongoose.Schema({
        nombre: {
            type: String,
            required: true,
        },
        apellido: {
            type: String,
            required: true,
        },
    }),
    fecha: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },
    capacidad: {
        type: Number,
        min: 1,
        required: true,
    },
    usado: {
        type: Boolean,
        default: false,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
        required: true,
    },
    expirado: {
        type: Boolean,
        default: false,
        index: true,
        required: true,
    },
});

schema.methods.format = function () {
    const newTurno = this.toJSON();

    const ahora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');
    if (ahora < this.horario.inicio && this.horario.completo) {
        newTurno.horario.estado = 'COMPLETO';
    } else if (ahora < this.horario.inicio) {
        newTurno.horario.estado = 'ABIERTO';
    } else if (this.horario.inicio < ahora && ahora < this.horario.fin) {
        newTurno.horario.estado = 'ACTIVO';
    } else {
        newTurno.horario.estado = 'CERRADO';
    }

    return newTurno;
};


const Turno = mongoose.model('Turno', schema);

module.exports = Turno;
