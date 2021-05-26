const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = new mongoose.Schema({
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
    documento: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
        unique: true,
        required: true,
    },
    celular: {
        type: String,
        maxlength: 255,
        trim: true,
        index: true,
        unique: true,
        required: true,
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
    admin: {
        type: Boolean,
        default: false,
        required: true,
    },
    activo: {
        type: Boolean,
        default: true,
    },
});

schema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        nombre: this.nombre,
        apellido: this.apellido,
        email: this.email,
        tipo: config.get('cuentas.tipos.SOPORTE'),
    }, process.env.JWT_PRIVATE_KEY);
};

const Soporte = mongoose.model('Soporte', schema);

module.exports = Soporte;
