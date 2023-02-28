const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.post('/', userController.userRegister);

module.exports = router;
