const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

// Get all products
router.get('/', productController.listProducts);

// Get product by ID
router.get('/:id', productController.getProduct);

// Create new product
router.post('/', productController.createProduct);

module.exports = router;