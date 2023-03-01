const { Product } = require('../database/models');

const getAllProducts = async () => {
  const products = await Product.findAll();
  return products;
}

const getProductById = async (id) => {
  const product = await Product.findByPk(id);
  return product;
}

const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
}

const updateProduct = async (id, productData) => {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error('Product not found');
  }
  await product.update(productData);
  return product;   
  }

  const deleteProduct = async (id) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new Error('Product not found');
    }
    await product.destroy();
    return product;
    
  }
  
  module.exports = 
{
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
