const express = require('express');
const userController = require('../controllers/users.controller');
const { userValidation } = require('../middleware/login.validation');

const router = express.Router();

router.post('/', userValidation, userController.userLogin);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getUsers);
// router.get('/staff', userController.getAllStaff);

module.exports = router;
