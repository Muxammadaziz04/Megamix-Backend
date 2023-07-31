const jwt = require('../services/jwt.service.js');
require('dotenv').config()

const AuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies?.access_token
        if (!token) {
            return res.status(401).send({ error: true, status: 401, message: 'Unauthorized' });
        }
        const payload = jwt.verify(token)
        if(payload?.error) {
            return res.status(401).send({ error: true, status: 401, message: payload.message });
        } else {
            req.user = payload
            next()
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = AuthMiddleware