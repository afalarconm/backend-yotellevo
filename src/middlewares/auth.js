const jwt = require('jsonwebtoken');
const { secret } = require('../utils/auth');

module.exports = (req, res, next) => {
    console.log(req.headers);

    // comprobar si existe el token
    if (!req.headers.authorization) {
        return res.status(401).send('No hay token');
    } else {
        // comprobar el token
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).send('Token invalido');
            } else {
                req.user = decoded.user;
                next();
            }
        });
    }
}
