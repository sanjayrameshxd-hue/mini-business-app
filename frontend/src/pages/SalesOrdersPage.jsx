import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getSalesOrders } from "../api/salesOrderApi";

import Card from "../components/ui/Card";

function formatCurrency(value) {
  return `Rs. ${Number(
    value || 0
  ).toFixed(2)}`;
}

function formatDate(value) {
  if (!value) {
    return "-";
  }

  return new Date(
    value
  ).toLocaleDateString();
}

function SalesOrdersPage() {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadSalesOrders() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getSalesOrders();

      setOrders(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load sales orders"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSalesOrders();
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Orders
          </h2>

          <p className="text-sm text-gray-500">
            View customer orders and
            track their status.
          </p>
        </div>

        <Link
          to="/sales-orders/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
        >
          Create Sales Order
        </Link>
      </div>

      <Card>
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading sales
            orders...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : orders.length ===
          0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">
            <h3 className="text-sm font-medium text-gray-900">
              No sales orders
              yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first
              sales order to
              start tracking
              customer orders.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500">
                  <th className="px-3 py-2 font-medium">
                    Order No
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Customer
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Status
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Items
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Total
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Created
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map(
                  (order) => (
                    <tr
                      key={
                        order.id
                      }
                      className="border-b last:border-0"
                    >
                      <td className="px-3 py-2">
                        <Link
                          to={`/sales-orders/${order.id}`}
                          className="font-medium text-gray-900 hover:underline"
                        >
                          {
                            order.orderNo
                          }
                        </Link>
                      </td>

                      <td className="px-3 py-2 text-gray-700">
                        {order
                          .customer
                          ?.name ||
                          "-"}
                      </td>

                      <td className="px-3 py-2">
                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                          {
                            order.status
                          }
                        </span>
                      </td>

                      <td className="px-3 py-2 text-gray-700">
                        {
                          order.itemCount
                        }
                      </td>

                      <td className="px-3 py-2 text-gray-700">
                        {formatCurrency(
                          order.totalAmount
                        )}
                      </td>

                      <td className="px-3 py-2 text-gray-700">
                        {formatDate(
                          order.createdAt
                        )}
                      </td>

                      <td className="px-3 py-2">
                        <Link
                          to={`/sales-orders/${order.id}`}
                          className="text-sm font-medium text-gray-900 underline"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default SalesOrdersPage;