let products = [
  { id: 1, sku: 'P001', name: 'Notebook', price: 50, stockQty: 100 },
  { id: 2, sku: 'P002', name: 'Pen', price: 10, stockQty: 500 }
];

function getAllProducts() {
  return products;
}

function getProductById(id) {
  return products.find(product => product.id === id);
}

function createProduct(data) {
  // Validate required fields
  if (!data.sku || !data.name) {
    const error = new Error('SKU and name are required');
    error.statusCode = 400;
    throw error;
  }

  // Validate price
  if (Number(data.price) <= 0) {
    const error = new Error('Price must be greater than zero');
    error.statusCode = 400;
    throw error;
  }

  // Check duplicate SKU
  const existingProduct = products.find(
    product => product.sku === data.sku
  );

  if (existingProduct) {
    const error = new Error('SKU already exists');
    error.statusCode = 400;
    throw error;
  }

  // Create new product
  const newProduct = {
    id: products.length + 1,
    sku: data.sku,
    name: data.name,
    price: Number(data.price),
    stockQty: Number(data.stockQty || 0)
  };

  // Add product to array
  products.push(newProduct);

  return newProduct;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct
};