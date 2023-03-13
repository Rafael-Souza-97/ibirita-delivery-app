const productsService = require('../services/products.service');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getAllProducts();
  return res.status(200).json(products);
};

const messageError = 'Product not found';

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (!product) {
    return res.status(404).json({ message: messageError });
  }
  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};
