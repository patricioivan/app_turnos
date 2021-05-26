const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    usuario: new mongoose.Schema({}),
    negocio: new mongoose.Schema({
        nombre: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
            index: true,
        },
        imagen: {
            type: String,
            trim: true,
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
        location: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
                required: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        calificacion: {
            cantidadOpiniones: {
                type: Number,
                default: 0,
                required: true,
            },
            cantidadPuntos: {
                type: Number,
                default: 0,
                required: true,
            },
            promedio: {
                type: Number,
                default: 0,
                required: true,
            },
        },
    }),
});

const Favorito = mongoose.model('Favorito', schema);

module.exports = Favorito;
