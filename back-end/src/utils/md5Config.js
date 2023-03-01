const crypto = require('crypto');

const convertToMD5 = (password) => {
  const hash = crypto.createHash('md5');
  hash.update(password);
  return hash.digest('hex');
};

module.exports = {
  convertToMD5,
};