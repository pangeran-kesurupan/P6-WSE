// src/middlewares/validateProduct.js

module.exports = (req, res, next) => {
  const { name, price } = req.body;
  const errors = [];

  if (!name) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  if (price == null) {
    errors.push({ field: 'price', message: 'Price is required' });
  }

  if (errors.length > 0)
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      errors,
    });

  next();
};
