const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const schema = new mongoose.Schema({
    empresa: new mongoose.Schema({
        razonSocial: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },
        nombre: {
            type: String,
            maxlength: 255,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            maxlength: 255,
            unique: true,
            index: true,
            required: true,
        },
    }),
    password: {
        type: String,
        maxlength: 255,
        required: true,
    },
    activo: {
        type: Boolean,
        required: true,
    },
});

schema.methods.generateToken = function () {
    return jwt.sign({
        _id: this._id,
        empresa: this.empresa,
        tipo: config.get('cuentas.tipos.OPERARIO'),
    }, process.env.JWT_PRIVATE_KEY);
};

const Operario = mongoose.model('Operario', schema);

module.exports = Operario;
