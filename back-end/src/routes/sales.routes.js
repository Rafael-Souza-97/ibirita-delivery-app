const express = require('express');
const salesController = require('../controllers/sales.controller');
const { salesValidation, typeOfValidation } = require('../middleware/sales.validation');
const {
  validateToken,
} = require('../middleware/token.validation');

const router = express.Router();

router.post(
  '/',
  validateToken,
  salesValidation,
  typeOfValidation,
  salesController.createSale,
  );
router.get('/', validateToken, salesController.getAllSales);
router.put('/:id', validateToken, salesController.updateStatusTo);
router.delete('/:id', validateToken, salesController.deleteSaleIfFinished);

module.exports = router;
