const config = require('config');
const Operario = require('../models/Operario');

// @desc Verifica si el token es correcto para cuenta OPERARIO
exports.cuenta = async function (req, res, next) {
    if (req.cuenta.tipo !== config.get('cuentas.tipos.OPERARIO')) {
        return res.status(403).json({
            codigo: 5004,
            mensaje: 'Se requiere cuenta OPERARIO',
        });
    }

    const operario = await Operario.findOne({ _id: req.cuenta._id });
    if (!operario) {
        return res.status(409).json({
            codigo: 9002,
            mensaje: 'Cuenta no encontrada',
        });
    }

    if (!operario.activo) {
        return res.status(409).json({
            codigo: 2003,
            mensaje: 'Cuenta inactiva',
        });
    }

    return next();
};
