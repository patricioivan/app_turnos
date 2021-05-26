module.exports = function (req, res, next) {
    if (!req.cuenta.admin) {
        return res.status(403).json({
            mensaje: 'Se require permisos de administrador',
        });
    }

    return next();
};
