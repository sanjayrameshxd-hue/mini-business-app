const prisma = require(
  "../lib/prisma"
);

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
    const error =
      new Error(
        "Product not found"
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
  return prisma.product.create(
    {
      data: {
        sku:
          productData.sku,

        name:
          productData.name,

        price:
          Number(
            productData.price
          ),

        stockQty:
          Number(
            productData.stockQty ||
              0
          ),

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
    const error =
      new Error(
        "Product not found"
      );

    error.statusCode =
      404;

    throw error;
  }

  return prisma.product.update(
    {
      where: { id },

      data: {
        sku:
          productData.sku,
        name:
          productData.name,

        price:
          productData.price !==
          undefined
            ? Number(
                productData.price
              )
            : undefined,

        stockQty:
          productData.stockQty !==
          undefined
            ? Number(
                productData.stockQty
              )
            : undefined,

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
    const error =
      new Error(
        "Product not found"
      );

    error.statusCode =
      404;

    throw error;
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