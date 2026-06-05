const products = [
  {
    id: 1,
    sku: 'P001',
    name: 'Notebook',
    price: 50,
    stockQty: 100
  },
  {
    id: 2,
    sku: 'P002',
    name: 'Pen',
    price: 10,
    stockQty: 200
  }
];

async function getProducts() {
  return products;
}

async function getProductById(
  id
) {
  const product =
    products.find(
      (p) => p.id === id
    );

  if (!product) {
    const error =
      new Error(
        'Product not found'
      );

    error.statusCode =
      404;

    throw error;
  }

  return product;
}

async function createProduct(
  productData
) {
  const newProduct = {
    id:
      Math.max(
        ...products.map(
          (p) => p.id
        ),
        0
      ) + 1,

    ...productData
  };

  products.push(
    newProduct
  );

  return newProduct;
}

async function updateProduct(
  id,
  productData
) {
  const productIndex =
    products.findIndex(
      (p) => p.id === id
    );

  if (
    productIndex === -1
  ) {
    const error =
      new Error(
        'Product not found'
      );

    error.statusCode =
      404;

    throw error;
  }

  products[
    productIndex
  ] = {
    ...products[
      productIndex
    ],
    ...productData
  };

  return products[
    productIndex
  ];
}

async function deleteProduct(
  id
) {
  const productIndex =
    products.findIndex(
      (p) => p.id === id
    );

  if (
    productIndex === -1
  ) {
    const error =
      new Error(
        'Product not found'
      );

    error.statusCode =
      404;

    throw error;
  }

  products.splice(
    productIndex,
    1
  );
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};