const userValidation = async (req, res, next) => {
  const { email, password } = req.body;
  const verifyEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!verifyEmail) {
    return res.status(404).json({ message: 'Email must be a valid' });
  }
  if (password.length < 6) {
    return res.status(404).json({ message: 'Password length must be at least 6 characteres long' });
  }
  next();
};

module.exports = { userValidation };