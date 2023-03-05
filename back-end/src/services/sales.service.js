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
  if (sales.length === 0) {
    throw new Error('No sales found');
  }
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

const updateSaleToPreparing = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  if (sale.status === 'Preparando') {
    throw new Error('Sale is already in preparing');
  }
  await sale.update({ status: 'Preparando' });
  const allSalesWithProducts = await getAllSales();
  return allSalesWithProducts;
};

const updateSaleToOnTheWay = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  if (sale.status === 'Em Trânsito') {
    throw new Error('Sale is already on the way');
  }
  await sale.update({ status: 'Em Trânsito' });
  const allSalesWithProducts = await getAllSales();
  return allSalesWithProducts;
};

const updateSaleToFinished = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  if (sale.status === 'Entregue') {
    throw new Error('Sale is already finished');
  }
  await sale.update({ status: 'Entregue' });
  const allSalesWithProducts = await getAllSales();
  return allSalesWithProducts;
};

const deleteSaleIfFinished = async (id) => {
  const sale = await Sale.findByPk(id);
  if (!sale) {
    throw new Error('Sale not found');
  }
  await sale.destroy();
  const allSalesWithProducts = await getAllSales();
  return allSalesWithProducts;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  getSalesByUserId,
  updateSaleToPreparing,
  updateSaleToOnTheWay,
  updateSaleToFinished,
  deleteSaleIfFinished,
};
