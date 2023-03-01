const { User } = require('../database/models');
const { convertToMD5 } = require('../utils/md5Config');

const userLogin = async (body) => {
  const { email } = body;

  const user = await User.findOne({
    where: {
      email,
    },
    // attributes: ['id', 'name', 'email', 'role'],
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

  return { data: newUserWithoutPassword, created };
};

module.exports = {
  userLogin,
  userRegister,
};
