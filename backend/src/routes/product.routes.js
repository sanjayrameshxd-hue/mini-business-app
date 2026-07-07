const express = require("express");
const productController = require("../controllers/product.controller");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get(
  "/",
  auth,
  requireRole("ADMIN", "SALES_USER"),
  productController.getProducts
);

router.get(
  "/:id",
  auth,
  requireRole("ADMIN", "SALES_USER"),
  productController.getProductById
);

router.post(
  "/",
  auth,
  requireRole("ADMIN"),
  productController.createProduct
);

router.put(
  "/:id",
  auth,
  requireRole("ADMIN"),
  productController.updateProduct
);

router.delete(
  "/:id",
  auth,
  requireRole("ADMIN"),
  productController.deleteProduct
);

module.exports = router;