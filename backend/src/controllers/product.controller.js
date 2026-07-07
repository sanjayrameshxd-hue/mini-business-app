const productService =
  require(
    '../services/product.service'
  );

async function getProducts(
  req,
  res,
  next
) {
  try {
    const products =
      await productService.getProducts();

    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(
  req,
  res,
  next
) {
  try {
    const product =
      await productService.getProductById(
        Number(req.params.id)
      );

    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(
  req,
  res,
  next
) {
  try {
    const product =
      await productService.createProduct(
        req.body
      );

    res.status(201).json(
      product
    );
  } catch (error) {
    next(error);
  }
}

async function updateProduct(
  req,
  res,
  next
) {
  try {
    const product =
      await productService.updateProduct(
        Number(req.params.id),
        req.body
      );

    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(
  req,
  res,
  next
) {
  try {
    await productService.deleteProduct(
      Number(req.params.id)
    );

    res.json({
      message:
        'Product deleted successfully'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};