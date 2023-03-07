const SALES_NOT_FOUND = 'No sales found';
const SALES_NOT_FOUND_ERROR = new Error(SALES_NOT_FOUND);
const SALE_NOT_FOUND = 'Sale not found';
const SALE_NOT_FOUND_ERROR = new Error(SALE_NOT_FOUND);
const STATUS_REQUIRED = 'Status is required';
const STATUS_REQUIRED_ERROR = new Error(STATUS_REQUIRED);
const TOKEN_NOT_FOUND = { message: 'Token not found' };
const EXPIRED_INVALID_TOKEN = { message: 'Expired or invalid token' };

module.exports = {
  SALES_NOT_FOUND,
  SALE_NOT_FOUND,
  SALES_NOT_FOUND_ERROR,
  SALE_NOT_FOUND_ERROR,
  STATUS_REQUIRED_ERROR,
  TOKEN_NOT_FOUND,
  EXPIRED_INVALID_TOKEN,
};
