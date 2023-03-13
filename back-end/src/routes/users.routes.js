const express = require('express');
const userController = require('../controllers/users.controller');
const {
  validateToken,
} = require('../middleware/token.validation');

const router = express.Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', validateToken, userController.deleteUserById);

module.exports = router;