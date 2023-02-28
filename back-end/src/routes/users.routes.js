const express = require('express');
const userController = require('../controllers/users.controller');
const userValidation = require('../middleware/login.validation');

const router = express.Router();

router.post('/', userController.userLogin);

module.exports = router;