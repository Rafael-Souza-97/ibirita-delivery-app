const express = require('express');
const userController = require('../controllers/users.controller');
const {
  adminToken,
} = require('../middleware/token.validation');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', adminToken, userController.deleteUserById);

module.exports = router;

