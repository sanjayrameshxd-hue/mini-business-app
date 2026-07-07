import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
import LoadingMessage from "../components/ui/LoadingMessage";
import EmptyState from "../components/ui/EmptyState";
import {
  getProducts,
  deleteProduct as deleteProductApi
} from "../api/productApi";

function formatPrice(price) {
  return `Rs. ${Number(price).toFixed(2)}`;
}

function ProductsPage() {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    favoriteProducts,
    setFavoriteProducts
  ] = useState(() => {
    const savedFavorites =
      localStorage.getItem(
        "favoriteProducts"
      );

    return savedFavorites
      ? JSON.parse(
          savedFavorites
        )
      : [];
  });

  const [
    selectedProduct,
    setSelectedProduct
  ] = useState(null);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getProducts();

      setProducts(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoriteProducts",
      JSON.stringify(
        favoriteProducts
      )
    );
  }, [favoriteProducts]);

  function toggleFavorite(
    productId
  ) {
    setFavoriteProducts(
      (prev) =>
        prev.includes(
          productId
        )
          ? prev.filter(
              (id) =>
                id !==
                productId
            )
          : [
              ...prev,
              productId
            ]
    );

    setSelectedProduct(
      null
    );
  }

  async function deleteProduct(
    productId
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProductApi(
        productId
      );

      setProducts(
        (
          prevProducts
        ) =>
          prevProducts.filter(
            (
              product
            ) =>
              product.id !==
              productId
          )
      );

      setFavoriteProducts(
        (prev) =>
          prev.filter(
            (id) =>
              id !==
              productId
          )
      );

      setSelectedProduct(
        null
      );
    } catch (error) {
      alert(
        error.message ||
          "Failed to delete product"
      );
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2
            style={{
              color:
                "#000000",
              fontSize:
                "32px",
              fontWeight:
                "bold"
            }}
          >
            Products
          </h2>

          <p className="text-sm text-gray-500">
            Product data loaded
            from the backend
            API.
          </p>
        </div>

        <Link
          to="/products/new"
         className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-3 text-sm font-semibold 
                    text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg 
                    hover:from-amber-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add Product
        </Link>
      </div>

      <Card>
        {loading ? (
          <LoadingMessage
            message="Loading products..."
          />
        ) : error ? (
          <div
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
          </div>
        ) : products.length ===
          0 ? (
          <EmptyState
              title="No products found"
              description="Create your first product to start using the app."
            />
        ) : (
          <div className="h-[350px] overflow-y-auto rounded-3xl border border-gray-300">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="border-b bg-green-100 text-gray-900">
                  <th className="px-4 py-4 text-lg font-bold">
                    SKU
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Name
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Price
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Stock
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map(
                  (
                    product
                  ) => (
                    <tr
                      key={
                        product.id
                      }
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
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {
                          product.sku
                        }
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {
                          product.name
                        }
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {formatPrice(
                          product.price
                        )}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        <div className="flex items-center justify-between">
                          <span>
                            {
                              product.stockQty
                            }
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
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                toggleFavorite(
                                  product.id
                                );
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              ❤️ Add to
                              Favorites
                            </button>

                            <Link
                              to={`/products/${product.id}/edit`}
                              onClick={(
                                e
                              ) =>
                                e.stopPropagation()
                              }
                              className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
                            >
                              ✏️ Update
                              Product
                            </Link>

                            <button
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                deleteProduct(
                                  product.id
                                );
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              🗑 Delete
                              Product
                            </button>
                          </div>
                        </td>
                      )}
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

export default ProductsPage;