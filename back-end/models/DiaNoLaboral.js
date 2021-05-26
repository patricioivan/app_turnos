const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    negocio: new mongoose.Schema({
    }),
    fecha: {
        type: String,
        maxlength: 255,
        trim: true,
        required: true,
    },
    motivo: {
        type: String,
        maxlength: 1000,
        trim: true,
        index: true,
        required: true,
    },
});

const DiaNoLaboral = mongoose.model('DiaNoLaboral', schema);

module.exports = DiaNoLaboral;
