const userValidation = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: 'Email and password are required' });
  }

  const verifyEmail = email.match(/^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  if (!verifyEmail) {
    return res.status(401).json({ message: 'Email must be valid' });
  }
  next();
};

module.exports = { userValidation };