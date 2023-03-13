const express = require('express');
const ProductController = require('../controllers/products.controller');
const {
  validateToken,
} = require('../middleware/token.validation');

const router = express.Router();

router.get('/', validateToken, ProductController.getAllProducts);
router.get('/:id', validateToken, ProductController.getProductById);

module.exports = router;
