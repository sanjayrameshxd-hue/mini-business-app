const express = require(
  "express"
);

const salesOrderController =
  require(
    "../controllers/salesOrder.controller"
  );

const router =
  express.Router();

// Get all sales orders
router.get(
  "/",
  salesOrderController.listSalesOrders
);

// Get sales order by ID
router.get(
  "/:id",
  salesOrderController.getSalesOrder
);

// Create sales order
router.post(
  "/",
  salesOrderController.createSalesOrder
);

module.exports =
  router;