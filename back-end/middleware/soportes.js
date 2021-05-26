const config = require('config');
const Soporte = require('../models/Soporte');

// @desc Verifica si el token es correcto para cuenta SOPORTE
exports.cuenta = async function (req, res, next) {
    if (req.cuenta.tipo !== config.get('cuentas.tipos.SOPORTE')) {
        return res.status(403).json({
            codigo: 5002,
            mensaje: 'Se require cuenta SOPORTE',
        });
    }

    const soporte = await Soporte.findOne({ _id: req.cuenta._id });
    if (!soporte) {
        return res.status(409).json({
            codigo: 9002,
            mensaje: 'Cuenta no encontrada',
        });
    }

    if (!soporte.activo) {
        return res.status(409).json({
            codigo: 2003,
            mensaje: 'Cuenta inactiva',
        });
    }

    req.cuenta.admin = soporte.admin;

    return next();
};
