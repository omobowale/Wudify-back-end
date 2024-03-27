const jwt = require('jsonwebtoken');
const { BEARER_TEXT } = require('../helpers/constants');
function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied' });
    try {
        const bearer = authHeader.split(" ")[0]
        const token = authHeader.split(" ")[1]
        if (bearer !== BEARER_TEXT) {
            return res.status(401).json({ error: 'Token is not valid' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;