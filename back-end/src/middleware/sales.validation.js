const salesValidation = async(req, res, next) => {
  const { sellerId, totalPrice, deliveryAdress, deliveryNumber } = req.body; 
  
  if (!sellerId || !totalPrice || !deliveryAdress || !deliveryNumber) {
    return res.status(404).json({ message: 'Missing fields required' });
  }
  if (deliveryNumber !== Number) {
    return res.status(400).json({ message: 'Delivery number must be a number' });
  }
  if (totalPrice !== Number) {
    return res.status(400).json({ message: 'Total price must be a number'});
  }
  next();
}

module.exports = salesValidation;
