const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    empresa: new mongoose.Schema({
    }),
    negocio: new mongoose.Schema({
        nombre: {
            type: String,
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
    usuario: new mongoose.Schema({
        nombre: {
            type: String,
            maxlength: 255,
            required: true,
        },
        apellido: {
            type: String,
            maxlength: 255,
            required: true,
        },
    }),
    fecha: {
        type: String,
        maxlength: 255,
        required: true,
    },
});

const Acceso = mongoose.model('Acceso', schema);

module.exports = Acceso;
