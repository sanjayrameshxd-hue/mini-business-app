const prisma = require('../lib/prisma');

function normalizeProductInput(data) {
  return {
    sku: data.sku?.trim(),
    name: data.name?.trim(),
    price: data.price,
    stockQty: data.stockQty
  };
}

function validateProductInput(data, { partial = false } = {}) {
  const errors = [];

  if (!partial || data.sku !== undefined) {
    if (!data.sku || !String(data.sku).trim()) {
      errors.push('SKU is required');
    }
  }

  if (!partial || data.name !== undefined) {
    if (!data.name || !String(data.name).trim()) {
      errors.push('Name is required');
    }
  }

  if (!partial || data.price !== undefined) {
    const price = Number(data.price);

    if (Number.isNaN(price) || price <= 0) {
      errors.push('Price must be greater than zero');
    }
  }

  if (!partial || data.stockQty !== undefined) {
    const stockQty = Number(data.stockQty);

    if (Number.isNaN(stockQty) || stockQty < 0) {
      errors.push('Stock quantity cannot be negative');
    }
  }

  if (errors.length > 0) {
    const error = new Error(errors.join(', '));
    error.statusCode = 400;
    throw error;
  }
}

async function getAllProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true
    },
    orderBy: {
      id: 'desc'
    }
  });
}

async function getProductById(id) {
  return prisma.product.findFirst({
    where: {
      id,
      isActive: true
    }
  });
}

async function createProduct(data) {
  validateProductInput(data);

  const normalized = normalizeProductInput(data);

  try {
    return await prisma.product.create({
      data: {
        sku: normalized.sku,
        name: normalized.name,
        price: normalized.price,
        stockQty: Number(normalized.stockQty || 0)
      }
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('SKU already exists');
      duplicateError.statusCode = 400;
      throw duplicateError;
    }

    throw error;
  }
}

async function updateProduct(id, data) {
  validateProductInput(data, { partial: true });

  const existingProduct = await getProductById(id);

  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const updateData = {};

  if (data.sku !== undefined) {
    updateData.sku = String(data.sku).trim();
  }

  if (data.name !== undefined) {
    updateData.name = String(data.name).trim();
  }

  if (data.price !== undefined) {
    updateData.price = data.price;
  }

  if (data.stockQty !== undefined) {
    updateData.stockQty = Number(data.stockQty);
  }

  try {
    return await prisma.product.update({
      where: {
        id
      },
      data: updateData
    });
  } catch (error) {
    if (error.code === 'P2002') {
      const duplicateError = new Error('SKU already exists');
      duplicateError.statusCode = 400;
      throw duplicateError;
    }

    throw error;
  }
}

async function deleteProduct(id) {
  const existingProduct = await getProductById(id);

  if (!existingProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return prisma.product.update({
    where: {
      id
    },
    data: {
      isActive: false
    }
  });
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};