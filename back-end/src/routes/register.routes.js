const express = require('express');
const userController = require('../controllers/users.controller');
const registerValidation = require('../middleware/register.validation');

const router = express.Router();

router.post('/', registerValidation, userController.userRegister);

module.exports = router;
