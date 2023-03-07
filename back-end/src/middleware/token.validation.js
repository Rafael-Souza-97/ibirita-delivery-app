const {
  TOKEN_NOT_FOUND,
  EXPIRED_INVALID_TOKEN,
} = require('../utils/error.messages');
const { checkToken } = require('../utils/jwtConfig');

const validateToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json(TOKEN_NOT_FOUND);
  }

  const payload = checkToken(authorization);
  if (payload.hasError) {
    return res.status(401).json(EXPIRED_INVALID_TOKEN);
  }
  req.user = payload.data.dataValues;
  next();
};

const tokenSeller = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json(TOKEN_NOT_FOUND);
  }

  if (authorization.role !== 'seller') {
    return res.status(404).json({ message: 'Token must have seller role' });
  }

  const payload = checkToken(authorization);
  if (payload.hasError) {
    return res.status(401).json(EXPIRED_INVALID_TOKEN);
  }
  req.user = payload.data.dataValues;
  next();
};

const adminToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(404).json(TOKEN_NOT_FOUND);
  }

  if (authorization.role !== 'administrator') {
    return res.status(404).json({ message: 'Token must have administrator role' });
  }

  const payload = checkToken(authorization);
  if (payload.hasError) {
    return res.status(401).json(EXPIRED_INVALID_TOKEN);
  }
  req.user = payload.data.dataValues;
  next();
};

module.exports = {
  validateToken,
  tokenSeller,
  adminToken,
};