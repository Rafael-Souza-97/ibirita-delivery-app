const usersModel = require('../database/models/users.model');

const userLogin = async (body) => {
  const { email } = body;

  console.log(email);

  const user = await usersModel.findOne({
    where: {
      email,
    },
  });

  console.log(user);

  if (!user) {
    throw new Error('User no found!');
  }

  return user;
};

module.exports = {
  userLogin,
};
