const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '..', 'public')));

const products = [
  { id: 1, name: 'Laptop',      price: 50000, category: 'Electronics' },
  { id: 2, name: 'Phone',       price: 20000, category: 'Electronics' },
  { id: 3, name: 'Headphones',  price: 2000,  category: 'Accessories' },
  { id: 4, name: 'Backpack',    price: 1500,  category: 'Accessories' },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = app;