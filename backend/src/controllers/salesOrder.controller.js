const salesOrderService = require(
  "../services/salesOrder.service"
);

async function listSalesOrders(
  req,
  res,
  next
) {
  try {
    const orders =
      await salesOrderService.getSalesOrders();

    const response = orders.map(
      (order) => ({
        id: order.id,
        orderNo: order.orderNo,
        customer:
          order.customer,
        status: order.status,
        totalAmount:
          order.totalAmount,
        createdAt:
          order.createdAt,
        itemCount:
          order.items.length,
      })
    );

    res.json(response);
  } catch (error) {
    next(error);
  }
}

async function getSalesOrder(
  req,
  res,
  next
) {
  try {
    const id = Number(
      req.params.id
    );

    if (
      !Number.isInteger(id)
    ) {
      const error =
        new Error(
          "Invalid sales order id"
        );

      error.statusCode =
        400;

      throw error;
    }

    const order =
      await salesOrderService.getSalesOrderById(
        id
      );

    if (!order) {
      const error =
        new Error(
          "Sales order not found"
        );

      error.statusCode =
        404;

      throw error;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listSalesOrders,
  getSalesOrder,
};