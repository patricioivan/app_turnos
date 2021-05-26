const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    negocio: new mongoose.Schema({
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
    capacidadTurno: {
        type: Number,
        min: 1,
        required: true,
    },
    duracionTurno: {
        type: String,
        trim: true,
        index: true,
        required: true,
    },
});

const JornadaLaboral = mongoose.model('JornadaLaboral', schema);

module.exports = JornadaLaboral;
