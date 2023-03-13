const express = require('express');
const userController = require('../controllers/users.controller');
const {
  registerValidation,
  roleValidation,
  fieldsValidation,
} = require('../middleware/register.validation');

const router = express.Router();

router.post(
  '/',
  fieldsValidation,
  registerValidation,
  userController.userRegister,
  );
router.post(
  '/seller',
  fieldsValidation,
  registerValidation,
  userController.sellerRegister,
  );
router.post(
  '/admin',
  fieldsValidation,
  registerValidation,
  roleValidation,
  userController.adminRegister,
  );

module.exports = router;
