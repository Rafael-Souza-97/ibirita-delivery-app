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
  try {
    const sales = await salesService.getAllSales();
    return res.status(200).json(sales);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
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

const getSalesByUserId = async (req, res) => {
  const { userId } = req.params;
  const sales = await salesService.getSalesByUserId(userId);
  return res.status(200).json(sales);
};

const updateStatusTo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const sale = await salesService.updateStatusTo(id, status);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteSaleIfFinished = async (req, res) => {
  const { id } = req.params;
  try {
    const sale = await salesService.deleteSaleIfFinished(id);
    return res.status(200).json(sale);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  getSalesByUserId,
  updateStatusTo,
  deleteSaleIfFinished,
};
