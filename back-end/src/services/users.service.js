const { User } = require('../database/models');

const userLogin = async (body) => {
  const { email } = body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error('User no found!');
  }

  return user;
};

module.exports = {
  userLogin,
};
