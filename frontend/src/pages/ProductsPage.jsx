import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import { getProducts } from "../api/productApi";

function formatPrice(price) {
  return `Rs. ${Number(price).toFixed(2)}`;
}

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [favoriteProducts, setFavoriteProducts] =
    useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(
        err.message || "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function toggleFavorite(productId) {
    setFavoriteProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );

    setSelectedProduct(null);
  }

  function deleteProduct(productId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.filter(
        (product) => product.id !== productId
      )
    );

    setSelectedProduct(null);
  }

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

        <Link
          to="/products/new"
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700"
        >
          Add Product
        </Link>
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
              Create your first product from the backend
              API or product form.
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
                    onClick={() =>
                      setSelectedProduct(
                        selectedProduct ===
                          product.id
                          ? null
                          : product.id
                      )
                    }
                    className="relative cursor-pointer border-b hover:bg-gray-50 last:border-0"
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
                      <div className="flex items-center justify-between">
                        <span>
                          {product.stockQty}
                        </span>

                        {favoriteProducts.includes(
                          product.id
                        ) && (
                          <span className="text-lg">
                            ❤️
                          </span>
                        )}
                      </div>
                    </td>

                    {selectedProduct ===
                      product.id && (
                      <td className="absolute right-4 top-12 z-50">
                        <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(
                                product.id
                              );
                            }}
                            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                          >
                            ❤️ Add to Favorites
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteProduct(
                                product.id
                              );
                            }}
                            className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete Product
                          </button>
                        </div>
                      </td>
                    )}
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