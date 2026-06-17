import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import LoadingMessage from "../components/ui/LoadingMessage";

import {
  confirmSalesOrder,
  getSalesOrder,
} from '../api/salesOrderApi';

function SalesOrderDetailPage() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  async function loadOrder() {
    try {
      setLoading(true);
      setError('');

      const data = await getSalesOrder(id);
      setOrder(data);
    } catch (err) {
      setError(err.message || 'Failed to load sales order');
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirm() {
    try {
      setConfirming(true);
      setError('');
      setSuccessMessage('');

      const updatedOrder = await confirmSalesOrder(id);

      setOrder(updatedOrder);
      setSuccessMessage(
        'Sales order confirmed successfully.'
      );
    } catch (err) {
      setError(
        err.message ||
          'Failed to confirm sales order'
      );
    } finally {
      setConfirming(false);
    }
  }

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (loading) {
  return (
    <LoadingMessage
      message="Loading sales order..."
    />
   );
  }
  
  if (error && !order) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="rounded-lg border bg-white p-4 text-sm text-gray-500">
        Sales order not found.
      </div>
    );
  }

  const isDraft = order.status === 'DRAFT';

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Sales Order {order.orderNo}
          </h2>

          <p className="text-sm text-gray-500">
            Review order details and confirm if stock
            is available.
          </p>
        </div>

        {isDraft ? (
          <Button
            onClick={handleConfirm}
            disabled={confirming}
          >
            {confirming
              ? 'Confirming...'
              : 'Confirm Order'}
          </Button>
        ) : null}
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          {successMessage}
        </div>
      ) : null}

      <Card title="Order Summary">
        <dl className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
          <div>
            <dt className="text-gray-500">
              Order No
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {order.orderNo}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500">
              Customer
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {order.customer?.name || '-'}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500">
              Status
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              {order.status}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500">
              Total
            </dt>
            <dd className="mt-1 font-medium text-gray-900">
              ₹{order.totalAmount}
            </dd>
          </div>
        </dl>
      </Card>

      <Card title="Order Items">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-gray-50 text-gray-500">
                <th className="px-3 py-2 font-medium">
                  Product
                </th>
                <th className="px-3 py-2 font-medium">
                  Quantity
                </th>
                <th className="px-3 py-2 font-medium">
                  Rate
                </th>
                <th className="px-3 py-2 font-medium">
                  Line Total
                </th>
              </tr>
            </thead>

            <tbody>
              {order.items?.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-0"
                >
                  <td className="px-3 py-2 font-medium text-gray-900">
                    {item.product?.name ||
                      `Product #${item.productId}`}
                  </td>

                  <td className="px-3 py-2 text-gray-700">
                    {item.quantity}
                  </td>

                  <td className="px-3 py-2 text-gray-700">
                    ₹{item.rate}
                  </td>

                  <td className="px-3 py-2 text-gray-700">
                    ₹{item.lineTotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export default SalesOrderDetailPage;