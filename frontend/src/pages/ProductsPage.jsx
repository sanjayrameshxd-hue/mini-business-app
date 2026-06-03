import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getProducts } from '../api/productApi';

function formatPrice(price) {
  return `Rs. ${Number(price).toFixed(2)}`;
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProducts() {
    try {
      setLoading(true);
      setError('');

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Products
          </h2>

          <p className="text-sm text-gray-500">
            Product data loaded from the backend API.
          </p>
        </div>

        <Button>Add Product</Button>
      </div>

      <Card>
        {loading ? (
          <p className="text-sm text-gray-500">
            Loading products...
          </p>
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-md border border-dashed p-6 text-center">
            <p className="text-sm font-medium text-gray-900">
              No products found
            </p>

            <p className="mt-1 text-sm text-gray-500">
              Create your first product from the backend API or
              product form.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-500">
                  <th className="px-3 py-2 font-medium">
                    SKU
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Name
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Price
                  </th>

                  <th className="px-3 py-2 font-medium">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b last:border-0"
                  >
                    <td className="px-3 py-2 font-medium text-gray-900">
                      {product.sku}
                    </td>

                    <td className="px-3 py-2 text-gray-700">
                      {product.name}
                    </td>

                    <td className="px-3 py-2 text-gray-700">
                      {formatPrice(product.price)}
                    </td>

                    <td className="px-3 py-2 text-gray-700">
                      {product.stockQty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default ProductsPage;