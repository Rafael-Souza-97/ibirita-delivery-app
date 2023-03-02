const salesService = require('../services/sales.service');
const { getUserFromToken } = require('../utils/jwtConfig');

const createSale = async (req, res) => {
  const { authorization } = req.headers;
  const user = getUserFromToken(authorization);
  const userId = user.data.id;
  const sale = await salesService.createSale(userId, req.body);
  return res.status(201).json(sale);
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.getAllSales();
  return res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const sale = await salesService.getSaleById(id);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
