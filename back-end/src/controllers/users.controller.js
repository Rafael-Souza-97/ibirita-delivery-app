const usersService = require('../services/users.service');

const userLogin = async (req, res) => {
  try {
    const user = await usersService.userLogin(req.body);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const userRegister = async (req, res) => {
  await usersService.userRegister(req.body);
  return res.status(201).json({ message: 'Created' });
};

module.exports = {
  userLogin,
  userRegister,
};
