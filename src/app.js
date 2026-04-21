const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

const products = [
  { id: 1,  name: 'MacBook Pro',      price: 120000, category: 'Electronics',  rating: 4.8, stock: 10 },
  { id: 2,  name: 'iPhone 15',        price: 80000,  category: 'Electronics',  rating: 4.9, stock: 15 },
  { id: 3,  name: 'Sony Headphones',  price: 15000,  category: 'Accessories',  rating: 4.7, stock: 25 },
  { id: 4,  name: 'Nike Backpack',    price: 3500,   category: 'Accessories',  rating: 4.5, stock: 30 },
  { id: 5,  name: 'Running Shoes',    price: 5000,   category: 'Footwear',     rating: 4.6, stock: 20 },
  { id: 6,  name: 'Yoga Mat',         price: 1200,   category: 'Fitness',      rating: 4.4, stock: 40 },
  { id: 7,  name: 'Coffee Maker',     price: 4500,   category: 'Appliances',   rating: 4.3, stock: 12 },
  { id: 8,  name: 'Samsung TV 55"',   price: 55000,  category: 'Electronics',  rating: 4.7, stock: 8  },
  { id: 9,  name: 'Leather Wallet',   price: 800,    category: 'Accessories',  rating: 4.2, stock: 50 },
  { id: 10, name: 'Dumbbells Set',    price: 2500,   category: 'Fitness',      rating: 4.5, stock: 18 },
  { id: 11, name: 'Air Purifier',     price: 12000,  category: 'Appliances',   rating: 4.6, stock: 7  },
  { id: 12, name: 'Casual Sneakers',  price: 3200,   category: 'Footwear',     rating: 4.4, stock: 22 },
];

// Get all products
app.get('/products', (req, res) => {
  const { category, search, sort } = req.query;
  let result = [...products];

  if (category && category !== 'All') {
    result = result.filter(p => p.category === category);
  }

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
  if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);

  res.json(result);
});

// Get single product
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Get categories
app.get('/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), products: products.length });
});

module.exports = app;