const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    horario: new mongoose.Schema({
    }),
    fecha: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },
    capacidadDisponible: {
        type: Number,
        required: true,
    },
    completo: {
        type: Boolean,
        default: false,
        required: true,
    },
});

const HorarioCompleto = mongoose.model('HorarioCompleto', schema);

module.exports = HorarioCompleto;
