const express = require('express');
const salesController = require('../controllers/sales.controller');
const validateToken = require('../middleware/token.validation');
const { salesValidation, typeOfValidation } = require('../middleware/sales.validation');

const router = express.Router();

router.post(
  '/',
  validateToken,
  salesValidation,
  typeOfValidation,
  salesController.createSale,
  );
router.get('/', validateToken, salesController.getAllSales);
router.get('/:id', validateToken, salesController.getSaleById);
router.get('/customer/:userId', validateToken, salesController.getSalesByUserId);
router.put('/preparing/order/:id', validateToken, salesController.updateSaleToPreparing);
router.put('/send/order/:id', validateToken, salesController.updateSaleToOnTheWay);
router.put('/order/done/:id', validateToken, salesController.updateSaleToFinished);
router.delete('/:id', validateToken, salesController.deleteSaleIfFinished);

module.exports = router;