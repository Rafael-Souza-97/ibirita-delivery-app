const express = require('express');
const userController = require('../controllers/users.controller');
const { registerValidation } = require('../middleware/register.validation');

const router = express.Router();

router.post('/', registerValidation, userController.userRegister);
router.post('/seller', registerValidation, userController.sellerRegister);

module.exports = router;
