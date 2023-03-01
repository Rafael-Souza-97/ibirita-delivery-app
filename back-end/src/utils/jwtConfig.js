require('dotenv').config();

const jwt = require('jsonwebtoken');

const secretPassword = process.env.JWT_SECRET || 'suaSenhaSecreta';

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const generateToken = (user) => {
  const token = jwt.sign({ data: user }, secretPassword, jwtConfig);
  return token;
};

const checkToken = (authorization) => {
  try {
    const payload = jwt.verify(authorization, secretPassword);
    return payload;
  } catch (error) {
    return { hasError: true, error };
  }
};

module.exports = {
  generateToken,
  checkToken,
};