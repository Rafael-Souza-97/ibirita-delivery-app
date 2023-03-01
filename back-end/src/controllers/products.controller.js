const productsService = require('../services/products.service');

const getAllProducts = async (req, res) => {
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

const createProduct = async (req, res) => {
  const product = await productsService.createProduct(req.body);
  return res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.updateProduct(id, req.body);
  if (!product) {
    return res.status(404).json({ message: messageError });
  }
  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.deleteProduct(id);
  if (!product) {
    return res.status(404).json({ message: messageError });
  }
  return res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
