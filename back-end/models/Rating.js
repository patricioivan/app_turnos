const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    usuario: new mongoose.Schema({
        email: {
            type: String,
            maxlength: 255,
            trim: true,
            index: true,
            required: true,
        },
        nombre: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },
        apellido: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },
    }),
    negocio: new mongoose.Schema({}),
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        required: true,
    },
    comentario: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
    },
});

const Rating = mongoose.model('Rating', schema);

module.exports = Rating;
