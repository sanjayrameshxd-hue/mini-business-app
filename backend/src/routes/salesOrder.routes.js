const express = require("express");
const salesOrderController = require("../controllers/salesOrder.controller");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get(
  "/",
  auth,
  requireRole("ADMIN", "SALES_USER"),
  salesOrderController.listSalesOrders
);

router.get(
  "/:id",
  auth,
  requireRole("ADMIN", "SALES_USER"),
  salesOrderController.getSalesOrder
);

router.post(
  "/",
  auth,
  requireRole("ADMIN", "SALES_USER"),
  salesOrderController.createSalesOrder
);

router.post(
  "/:id/confirm",
  auth,
  requireRole("ADMIN"),
  salesOrderController.confirmSalesOrder
);

module.exports = router;