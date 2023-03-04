const {
  SalesProducts,
  Sale,
} = require('../database/models');

const createSale = async (userId, saleData) => {
  const sale = await Sale.create({ userId, ...saleData });
  await Promise.all(saleData.products.map((product) => {
    const saleProduct = SalesProducts.create({
      saleId: sale.dataValues.id,
      productId: product.productId,
      quantity: product.quantity,
    });
    return saleProduct;
  }));
  const checkoutData = {
    ...sale.dataValues,
    products: saleData.products,
  }
  return checkoutData;
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

const getSalesByUserId = async (userId) => {
  const sales = await Sale.findAll({ where: { userId } });
  return sales;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  getSalesByUserId,
};
