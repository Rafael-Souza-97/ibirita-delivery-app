const { checkToken } = require('../utils/jwtConfig');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const payload = checkToken(authorization);
  if (payload.hasError) {
    return res.status(401).json({
      message: 'Expired or invalid token',
    });
  }
  req.user = payload.data.dataValues;
  next();
};

module.exports = validateToken;