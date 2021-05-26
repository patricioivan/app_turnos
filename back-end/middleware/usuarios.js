const config = require('config');
const Usuario = require('../models/Usuario');

// @desc Verifica si el token es correcto para cuenta USUARIO
exports.cuenta = async function (req, res, next) {
    if (req.cuenta.tipo !== config.get('cuentas.tipos.USUARIO')) {
        return res.status(403).json({
            codigo: 5001,
            mensaje: 'Se requiere cuenta USUARIO',
        });
    }

    const usuario = await Usuario.findOne({ _id: req.cuenta._id });
    if (!usuario) {
        return res.status(409).json({
            codigo: 9002,
            mensaje: 'Cuenta no encontrada',
        });
    }

    return next();
};
