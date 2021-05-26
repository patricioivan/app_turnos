const mongoose = require('mongoose');
const moment = require('moment-timezone');

const schema = new mongoose.Schema({
    negocio: new mongoose.Schema({
    }),
    jornada: new mongoose.Schema({
    }),
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
        trim: true,
        index: true,
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
        index: true,
        required: true,
    },
    fin: {
        type: String,
        trim: true,
        required: true,
    },
    estado: {
        type: String,
        default: 'estado',
        trim: true,
        required: true,
    },
    capacidad: {
        type: Number,
        min: 1,
        required: true,
    },
    capacidadDisponible: {
        type: Number,
        default: 1,
        required: true,
    },
});

schema.methods.hateoas = function (req) {
    const newHorario = this.toJSON();
    newHorario.links = {};
    newHorario.links.solicitarTurno = {};
    newHorario.links.solicitarTurno.route = `${req.headers.host}/api/negocios/${this.negocio._id}/horarios/${this._id}/turnos`;
    newHorario.links.solicitarTurno.method = 'POST';
    return newHorario;
};

schema.methods.setEstado = function () {
    const ahora = moment.tz(new Date(), 'America/Argentina/Buenos_Aires').format('HH:mm');
    const newHorario = this.toJSON();
    delete newHorario.completo;

    if (ahora < this.inicio && this.completo) {
        newHorario.estado = 'COMPLETO';
    } else if (ahora < this.inicio) {
        newHorario.estado = 'ABIERTO';
    } else if (this.inicio < ahora && ahora < this.fin) {
        newHorario.estado = 'ACTIVO';
    } else {
        newHorario.estado = 'CERRADO';
    }

    return newHorario;
};

const Horario = mongoose.model('Horario', schema);

module.exports = Horario;
