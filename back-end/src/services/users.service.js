const { User } = require('../database/models');
const { convertToMD5 } = require('../utils/md5Config');

const userLogin = async (body) => {
  const { email } = body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
};

const userRegister = async (body) => {
  const { name, email, password } = body;

  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: convertToMD5(password),
      role: 'customer',
    },
  });

  const { password: _, ...newUserWithoutPassword } = newUser.dataValues;

  console.log(newUserWithoutPassword);

  return { data: newUserWithoutPassword, created };
};

const sellerRegister = async (body) => {
  const { name, email, password } = body;

  const [newSeller, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: convertToMD5(password),
      role: 'seller',
    },
  });

  const { password: _, ...newSellerWithoutPassword } = newSeller.dataValues;

  return { data: newSellerWithoutPassword, created };
};

const adminRegister = async (body) => {
  const { name, email, password, role } = body;

  const [newUser, created] = await User.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      password: convertToMD5(password),
      role,
    },
  });

  const { password: _, ...newUserWithoutPassword } = newUser.dataValues;

  return { data: newUserWithoutPassword, created };
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const getUsers = async () => {
  const users = await User.findAll();
  if (!users) {
    throw new Error('Users not found');
  }
  return users;
};

const deleteUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('User not found');
  }
  await user.destroy();
};

module.exports = {
  userLogin,
  userRegister,
  getUserById,
  sellerRegister,
  adminRegister,
  getUsers,
  deleteUserById,
};
