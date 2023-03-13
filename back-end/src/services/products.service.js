const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  return product;
};

  module.exports = {
  getAllProducts,
  getProductById,
};
