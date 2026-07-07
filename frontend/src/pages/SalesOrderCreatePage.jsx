import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCustomers } from "../api/customerApi";
import { getProducts } from "../api/productApi";
import { createSalesOrder } from "../api/salesOrderApi";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

function calculateLineTotal(item) {
  const quantity = Number(
    item.quantity || 0
  );

  const rate = Number(
    item.rate || 0
  );

  return quantity * rate;
}

function SalesOrderCreatePage() {
  const navigate = useNavigate();

  const [customers, setCustomers] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [customerId, setCustomerId] =
    useState("");

  const [items, setItems] =
    useState([
      {
        productId: "",
        quantity: 1,
        rate: "",
      },
    ]);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          customersData,
          productsData,
        ] = await Promise.all([
          getCustomers(),
          getProducts(),
        ]);

        setCustomers(
          customersData
        );

        setProducts(
          productsData
        );
      } catch (err) {
        setError(
          err.message ||
            "Failed to load form data"
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function addItemRow() {
    setItems((prev) => [
      ...prev,
      {
        productId: "",
        quantity: 1,
        rate: "",
      },
    ]);
  }

  function removeItemRow(
    indexToRemove
  ) {
    setItems((prev) =>
      prev.filter(
        (_, index) =>
          index !==
          indexToRemove
      )
    );
  }

  function updateItem(
    indexToUpdate,
    field,
    value
  ) {
    setItems((prev) =>
      prev.map(
        (item, index) => {
          if (
            index !==
            indexToUpdate
          ) {
            return item;
          }

          return {
            ...item,
            [field]: value,
          };
        }
      )
    );
  }

  const orderTotal =
    items.reduce(
      (sum, item) =>
        sum +
        calculateLineTotal(
          item
        ),
      0
    );

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    // Validation
    if (!customerId) {
      setError(
        "Please select a customer"
      );
      return;
    }

    const hasInvalidItem =
      items.some(
        (item) =>
          !item.productId ||
          Number(
            item.quantity
          ) <= 0 ||
          Number(
            item.rate
          ) <= 0
      );

    if (hasInvalidItem) {
      setError(
        "Please fill all item details correctly"
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        customerId:
          Number(
            customerId
          ),

        items: items.map(
          (item) => ({
            productId:
              Number(
                item.productId
              ),

            quantity:
              Number(
                item.quantity
              ),

            rate: Number(
              item.rate
            ),
          })
        ),
      };

      await createSalesOrder(
        payload
      );

      navigate(
        "/sales-orders"
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to create sales order"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-gray-600">
        Loading form
        data...
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Create Sales
          Order
        </h2>

        <p className="text-sm text-gray-500">
          Create a draft
          order. Stock
          will reduce
          only after
          confirmation.
        </p>
      </div>

      {error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <form
        onSubmit={
          handleSubmit
        }
        className="space-y-4"
      >
        {/* Customer */}
        <Card>
          <label className="block text-sm font-medium text-gray-700">
            Customer
          </label>

          <select
            value={
              customerId
            }
            onChange={(
              event
            ) =>
              setCustomerId(
                event.target
                  .value
              )
            }
            className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
          >
            <option value="">
              Select
              customer
            </option>

            {customers.map(
              (
                customer
              ) => (
                <option
                  key={
                    customer.id
                  }
                  value={
                    customer.id
                  }
                >
                  {
                    customer.code
                  }{" "}
                  -{" "}
                  {
                    customer.name
                  }
                </option>
              )
            )}
          </select>
        </Card>

        {/* Items */}
        <Card>
          <div className="space-y-3">
            {items.map(
              (
                item,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="grid grid-cols-1 gap-3 rounded-md border p-3 md:grid-cols-5"
                >
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Product
                    </label>

                    <select
                      value={
                        item.productId
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          index,
                          "productId",
                          event
                            .target
                            .value
                        )
                      }
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    >
                      <option value="">
                        Select
                        product
                      </option>

                      {products.map(
                        (
                          product
                        ) => (
                          <option
                            key={
                              product.id
                            }
                            value={
                              product.id
                            }
                          >
                            {
                              product.sku
                            }{" "}
                            -{" "}
                            {
                              product.name
                            }
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Quantity
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        item.quantity
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          index,
                          "quantity",
                          event
                            .target
                            .value
                        )
                      }
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Rate
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={
                        item.rate
                      }
                      onChange={(
                        event
                      ) =>
                        updateItem(
                          index,
                          "rate",
                          event
                            .target
                            .value
                        )
                      }
                      className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-500">
                        Line Total
                      </p>

                      <p className="text-sm font-semibold text-gray-900">
                        Rs.{" "}
                        {calculateLineTotal(
                          item
                        )}
                      </p>
                    </div>

                    {items.length >
                    1 ? (
                      <button
                        type="button"
                        onClick={() =>
                          removeItemRow(
                            index
                          )
                        }
                        className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              type="button"
              onClick={
                addItemRow
              }
              className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Add Item
            </button>

            <div className="text-right">
              <p className="text-xs text-gray-500">
                Approximate
                Order Total
              </p>

              <p className="text-lg font-semibold text-gray-900">
                Rs.{" "}
                {orderTotal.toFixed(
                  2
                )}
              </p>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() =>
              navigate(
                "/sales-orders"
              )
            }
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <Button
            type="submit"
            disabled={
              saving
            }
          >
            {saving
              ? "Saving..."
              : "Create Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SalesOrderCreatePage;