const express = require("express");
const cors = require("cors");

const app = express();


// Middleware to read JSON request body
app.use(cors());
app.use(express.json());

// In-memory product data
const products = [
  { id: 1, sku: "P001", name: "Notebook", price: 50, stockQty: 100 },
  { id: 2, sku: "P002", name: "Pen", price: 10, stockQty: 500 },
  { id: 3, sku: "P003", name: "Marker", price: 30, stockQty: 20 }
];

// 1. Health Check
app.get("/health", (req, res) => {
  res.json({
    status: "ok"
  });
});

// 2. Get All Products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// 3. Get Product by ID
app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  const product = products.find(
    p => p.id === productId
  );

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

// 4. Create Product
app.post("/api/products", (req, res) => {
  const { sku, name, price, stockQty } = req.body;

  // Validate required fields
  if (!sku || !name || price === undefined || stockQty === undefined) {
    return res.status(400).json({
      message: "sku, name, price, and stockQty are required"
    });
  }

  // Check duplicate SKU
  const existingSku = products.find(
    p => p.sku === sku
  );

  if (existingSku) {
    return res.status(400).json({
      message: "SKU already exists"
    });
  }

  // Create new product
  const newProduct = {
    id: products.length + 1,
    sku,
    name,
    price,
    stockQty
  };

  products.push(newProduct);

  res.status(201).json(newProduct);
});

module.exports = app;