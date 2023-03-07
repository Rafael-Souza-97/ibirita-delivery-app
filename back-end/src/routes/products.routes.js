const express = require('express');
const ProductController = require('../controllers/products.controller');
const {
  validateToken,
  adminToken,
} = require('../middleware/token.validation');

const router = express.Router();

router.get('/', validateToken, ProductController.getAllProducts);
router.get('/:id', validateToken, ProductController.getProductById);
router.post('/', adminToken, ProductController.createProduct);
router.put('/:id', adminToken, ProductController.updateProduct);
router.delete('/:id', adminToken, ProductController.deleteProduct);

module.exports = router;
