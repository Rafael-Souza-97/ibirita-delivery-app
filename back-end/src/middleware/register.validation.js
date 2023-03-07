const registerValidation = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  const verifyEmail = email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  if (!req.body) {
    return res.status(404).json({ message: 'There are missing fields' });
  }

  if (name.length < 12) {
    return res.status(404).json({ message: 'Name length must be at least 12 characteres long' });
  }
  
  if (!verifyEmail) {
    return res.status(404).json({ message: 'Email must be a valid' });
  }

  if (password.length < 6) {
    return res.status(404).json({ message: 'Password length must be at least 6 characteres long' });
  }

  next();
};

const roleValidation = async (req, res, next) => {
  const { role } = req.body;

  if (!role) {
    return res.status(404).json({ message: 'Role is required' });
  }

  if (role !== 'customer' && role !== 'seller' && role !== 'administrator') {
    return res.status(404).json({ message: 'Role must be customer, seller or administrator' });
  }

  next();
};

module.exports = {
  registerValidation,
  roleValidation,
};
