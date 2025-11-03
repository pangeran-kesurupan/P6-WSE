const express = require('express');
const router = express.Router();
const products = require('../data/products.data');

// 👉 import middleware validasi
const validateProduct = require('../middlewares/validateProduct');

// GET /api/products
router.get('/', (req, res) => {
  res.json({ success: true, data: products });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});
// POST /api/products
// ✅ middleware jalan di sini
router.post('/', validateProduct, (req, res) => {
  const { name, price, stock } = req.body;
  const newProduct = {
    id: Date.now(),
    name,
    price,
    stock: stock ?? 0
  };
  products.push(newProduct);
  res.status(201).json({
    success: true,
    message: 'Product created',
    data: newProduct
  });
});

// PUT /api/products/:id
// ✅ middleware jalan di sini juga
router.put('/:id', validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const { name, price, stock } = req.body;
  products[index] = {
    id,
    name,
    price,
    stock: stock ?? products[index].stock ?? 0
  };

  res.json({
    success: true,
    message: 'Product updated',
    data: products[index]
  });
});

router.get('/crash/test', (req, res, next) => {
  const err = new Error('Tes error sengaja');
  next(err);
});

// PATCH /api/products/:id
router.patch('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const { name, price, stock } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;

  res.json({
    success: true,
    message: 'Product partially updated',
    data: product,
  });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  products.splice(index, 1);
  res.json({ success: true, message: 'Product deleted' });
});


module.exports = router;
