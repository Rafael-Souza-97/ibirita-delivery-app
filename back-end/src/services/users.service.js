const { User } = require('../database/models');

const userLogin = async (body) => {
  const { email } = body;

  const user = await User.findOne({
    where: {
      email,
    },
    attributes: ['id', 'name', 'email', 'role'],
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
};

const userRegister = async (body) => {
  const { name, email, password, role } = body;

  const newUser = await User.create({
    name,
    email,
    password,
    role,
  });

  const { password: _, ...newUserWithoutPassword } = newUser.dataValues;

  return newUserWithoutPassword;
};

module.exports = {
  userLogin,
  userRegister,
};
