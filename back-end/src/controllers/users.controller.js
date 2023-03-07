const { generateToken } = require('../utils/jwtConfig');
const { convertToMD5 } = require('../utils/md5Config');
const usersService = require('../services/users.service');

const userLogin = async (req, res) => {
  try {
    const user = await usersService.userLogin(req.body);

    if (user.password !== convertToMD5(req.body.password)) {
      return res.status(401).json({ message: 'Email or password must be valid' });
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = generateToken(userWithoutPassword);
    return res.status(200).json({
      ...userWithoutPassword,
      token,
    });
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
  const response = {
    ...newUser.data,
    token,
  };

  return res.status(201).json(response);
};

const sellerRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const newSeller = await usersService.sellerRegister({ name, email, password });

  if (!newSeller.created) {
    return res.status(409).json({ message: 'Seller already registered' });
  }
  const token = generateToken(newSeller.data);
  const response = {
    ...newSeller.data,
    token,
  };

  return res.status(201).json(response);
};

const adminRegister = async (req, res) => {
  const { name, email, password, role } = req.body;
  const newUser = await usersService.adminRegister({ name, email, password, role });

  if (!newUser.created) {
    return res.status(409).json({ message: 'User already registered' });
  }
  const token = generateToken(newUser.data);
  const response = {
    ...newUser.data,
    token,
  };

  return res.status(201).json(response);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await usersService.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await usersService.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// const getAllStaff = async (_req, res) => {
//   try {
//     const staff = await usersService.getAllStaff();
//     return res.status(200).json(staff);
//   } catch (error) {
//     return res.status(404).json({ message: error.message });
//   }
// };

module.exports = {
  userLogin,
  userRegister,
  getUserById,
  sellerRegister,
  adminRegister,
  getUsers,
  // getAllStaff,
};
