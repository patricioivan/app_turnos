const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = new mongoose.Schema({
    email: {
        type: String,
        maxlength: 255,
        trim: true,
        unique: true,
        index: true,
        required: true,
    },
    password: {
        type: String,
        maxlength: 255,
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
});

schema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
        tipo: config.get('cuentas.tipos.USUARIO'),
    }, process.env.JWT_PRIVATE_KEY);
};

const Usuario = mongoose.model('Usuario', schema);

module.exports = Usuario;
