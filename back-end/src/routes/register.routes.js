const express = require('express');
const userController = require('../controllers/users.controller');
const { registerValidation, roleValidation } = require('../middleware/register.validation');
const { adminToken } = require('../middleware/token.validation');

const router = express.Router();

router.post('/', registerValidation, userController.userRegister);
router.post('/seller', registerValidation, userController.sellerRegister);
router.post(
  '/admin',
  adminToken,
  registerValidation,
  roleValidation,
  userController.adminRegister,
  );

module.exports = router;
