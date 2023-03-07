const express = require('express');
const userController = require('../controllers/users.controller');
const { userValidation } = require('../middleware/login.validation');

const router = express.Router();

router.post('/', userValidation, userController.userLogin);
router.get('/users/:id', userController.getUserById);

module.exports = router;
