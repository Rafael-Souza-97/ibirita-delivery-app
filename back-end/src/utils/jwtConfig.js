const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '1d',

  });

  return token;
};

module.exports = {
  createToken,
  // verifyToken,
};