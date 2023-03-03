const salesValidation = async(req, res, next) => {
  const { sellerId, totalPrice, deliveryAddress, deliveryNumber } = req.body; 
  
  if (!sellerId || !totalPrice || !deliveryAddress || !deliveryNumber) {
    return res.status(404).json({ message: 'Missing fields required' });
  }
  if (typeof totalPrice !== 'number') {
    return res.status(400).json({ message: 'Total price must be a number'});
  }
  next();
}

module.exports = salesValidation;
