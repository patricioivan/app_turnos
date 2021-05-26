const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth');
    if (!token) {
        return res.status(401).json({
            mensaje: 'Se require autenticacion',
        });
    }

    try {
        req.cuenta = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        return next();
    } catch (err) {
        return res.status(401).json({
            codigo: 9000,
            mensaje: 'Token invalido',
        });
    }
};
