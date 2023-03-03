const fs = require('fs');
const jwt = require('jsonwebtoken');

const secretPassword = fs.readFileSync('./jwt.evaluation.key');

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

const getUserFromToken = (token) => {
  const user = jwt.decode(token);
  return user;
};

module.exports = {
  generateToken,
  checkToken,
  getUserFromToken,
};