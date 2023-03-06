const { SalesProducts } = require('../database/models');

const getAllSalesProductsById = async (id) => {
  const salesProducts = await SalesProducts.findAll({ where: { saleId: id } });
  return salesProducts;
};

module.exports = {
  getAllSalesProductsById,
};
