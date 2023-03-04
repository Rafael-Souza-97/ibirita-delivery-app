const salesProductsService = require('../services/salesProducts.service');

const getAllSalesProductsById = async (id) => {
  const salesProducts = await salesProductsService.getAllSalesProductsById(id);
  return salesProducts;
};

module.exports = {
  getAllSalesProductsById,
};
