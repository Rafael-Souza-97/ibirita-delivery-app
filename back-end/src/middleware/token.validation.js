const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
    try {
      jwt.verify(authorization, JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    next();
  };

module.exports = validateToken;