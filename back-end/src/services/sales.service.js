const {
  SalesProducts,
  Sale,
  Product
} = require('../database/models');

const createSale = async (userId, saleData) => {
  const sale = await Sale.create({ userId, ...saleData });
  await Promise.all(saleData.products.map(async (product) => {
    const saleProduct = await SalesProducts.create({
      saleId: sale.dataValues.id,
      productId: product.productId,
      quantity: product.quantity,
    });
    return saleProduct;
  }));
  const allSalesWithProducts = await getAllSales();

  return allSalesWithProducts;
};

const getAllSales = async () => {
  const sales = await Sale.findAll({
    include: [
      {
        model: Product,
        as: 'products',
        through: {
          model: SalesProducts,
          attributes: ['quantity'],
        },
      },
    ],
  });
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
