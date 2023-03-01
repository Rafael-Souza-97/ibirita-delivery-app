const { generateToken } = require('../utils/jwtConfig');
const { convertToMD5 } = require('../utils/md5Config');
const usersService = require('../services/users.service');

const userLogin = async (req, res) => {
  try {
    const user = await usersService.userLogin(req.body);

    if (user.password !== convertToMD5(req.body.password)) {
      return res.status(401).json({ message: 'Email or password must be valid' });
    }

    const token = generateToken(user);
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await usersService.userRegister({ name, email, password });

  if (!newUser.created) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const token = generateToken(newUser.data);
  return res.status(201).json({ token });
};

module.exports = {
  userLogin,
  userRegister,
};
