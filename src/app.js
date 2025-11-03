// src/app.js

const express = require('express');
const morgan = require('morgan');
const productRoutes = require('./routes/products.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express(); // ✅ Buat app dulu

// Middleware global
app.use(morgan('dev'));
app.use(express.json());

// Route utama
app.get('/', (req, res) => {
  res.json({ message: 'API Ready 🚀' });
});

// Routes produk
app.use('/api/products', productRoutes);

// Middleware error handler (harus di bawah semua route)
app.use(errorHandler);

// Jalankan server
app.listen(3000, () => console.log('Server running on port 3000'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});