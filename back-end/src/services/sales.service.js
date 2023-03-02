const { Sale } = require('../database/models');

const createSale = async (userId, saleData) => {
  const sale = await Sale.create({ userId, ...saleData });
  return sale;
};

const getAllSales = async () => {
  const sales = await Sale.findAll();
  return sales;
};

const getSaleById = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  return sale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
