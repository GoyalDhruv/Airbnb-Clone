const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'oqwdmnmfovenvensjdd';

const authenticateToken = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, jwtSecret, (err, userData) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token.' });
        }
        req.user = userData;
        req.token = token;
        next();
    });
};

module.exports = authenticateToken;
