const prisma = require(
  "../lib/prisma"
);

function createAppError(
  message,
  statusCode = 400
) {
  const error = new Error(
    message
  );

  error.statusCode =
    statusCode;

  return error;
}

function validateProductInput(
  data,
  { partial = false } = {}
) {
  if (!partial) {
    if (
      !data.sku ||
      !data.name
    ) {
      throw createAppError(
        "SKU and name are required"
      );
    }
  }

  if (
    data.price !== undefined &&
    Number(data.price) <= 0
  ) {
    throw createAppError(
      "Price must be greater than zero"
    );
  }

  if (
    data.stockQty !== undefined &&
    Number(data.stockQty) < 0
  ) {
    throw createAppError(
      "Stock quantity cannot be negative"
    );
  }
}

function normalizeProductInput(
  data
) {
  return {
    sku:
      data.sku?.trim(),

    name:
      data.name?.trim(),

    price:
      data.price !== undefined
        ? Number(
            data.price
          )
        : undefined,

    stockQty:
      data.stockQty !==
      undefined
        ? Number(
            data.stockQty
          )
        : undefined,
  };
}

async function getProducts() {
  return prisma.product.findMany(
    {
      orderBy: {
        id: "desc",
      },
    }
  );
}

async function getProductById(
  id
) {
  const product =
    await prisma.product.findUnique(
      {
        where: { id },
      }
    );

  if (!product) {
    throw createAppError(
      "Product not found",
      404
    );
  }

  return product;
}

async function createProduct(
  productData
) {
  validateProductInput(
    productData
  );

  const normalized =
    normalizeProductInput(
      productData
    );

  const existingProduct =
    await prisma.product.findUnique(
      {
        where: {
          sku:
            normalized.sku,
        },
      }
    );

  if (
    existingProduct
  ) {
    throw createAppError(
      "SKU already exists"
    );
  }

  return prisma.product.create(
    {
      data: {
        sku:
          normalized.sku,

        name:
          normalized.name,

        price:
          normalized.price,

        stockQty:
          normalized.stockQty ||
          0,

        isActive:
          true,
      },
    }
  );
}

async function updateProduct(
  id,
  productData
) {
  const existingProduct =
    await prisma.product.findUnique(
      {
        where: { id },
      }
    );

  if (
    !existingProduct
  ) {
    throw createAppError(
      "Product not found",
      404
    );
  }

  validateProductInput(
    productData,
    {
      partial: true,
    }
  );

  const normalized =
    normalizeProductInput(
      productData
    );

  if (
    normalized.sku &&
    normalized.sku !==
      existingProduct.sku
  ) {
    const duplicateProduct =
      await prisma.product.findUnique(
        {
          where: {
            sku:
              normalized.sku,
          },
        }
      );

    if (
      duplicateProduct
    ) {
      throw createAppError(
        "SKU already exists"
      );
    }
  }

  return prisma.product.update(
    {
      where: { id },

      data: {
        sku:
          normalized.sku,

        name:
          normalized.name,

        price:
          normalized.price,

        stockQty:
          normalized.stockQty,

        isActive:
          productData.isActive,
      },
    }
  );
}

async function deleteProduct(
  id
) {
  const product =
    await prisma.product.findUnique(
      {
        where: { id },
      }
    );

  if (!product) {
    throw createAppError(
      "Product not found",
      404
    );
  }

  await prisma.product.delete(
    {
      where: { id },
    }
  );
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};