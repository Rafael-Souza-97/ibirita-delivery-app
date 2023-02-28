const usersService = require('../services/users.service');

const userLogin = async (req, res) => {
  const user = await usersService.userLogin(req.body);
  return res.status(200).json(user);
};

module.exports = {
  userLogin,
};