const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = new mongoose.Schema({
    nombre: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
        required: true,
    },
    razonSocial: {
        type: String,
        maxlength: 255,
        trim: true,
        unique: true,
        index: true,
        required: true,
    },
    cuil: {
        type: Number,
        maxlength: 255,
        trim: true,
        unique: true,
        index: true,
        required: true,
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
    email: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        maxlength: 255,
        required: true,
    },
});

schema.index({ location: '2dsphere' });

schema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        nombre: this.nombre,
        razonSocial: this.razonSocial,
        email: this.email,
        tipo: config.get('cuentas.tipos.EMPRESA'),
    }, process.env.JWT_PRIVATE_KEY);
};

const Empresa = mongoose.model('Empresa', schema);

module.exports = Empresa;
