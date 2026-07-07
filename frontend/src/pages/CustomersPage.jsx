import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getCustomers,
  deleteCustomer as deleteCustomerApi
} from "../api/customerApi";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingMessage from "../components/ui/LoadingMessage";

function CustomersPage() {
  const [customers, setCustomers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    favoriteCustomers,
    setFavoriteCustomers
  ] = useState(() => {
    const savedFavorites =
      localStorage.getItem(
        "favoriteCustomers"
      );

    return savedFavorites
      ? JSON.parse(
          savedFavorites
        )
      : [];
  });

  const [
    selectedCustomer,
    setSelectedCustomer
  ] = useState(null);

  async function loadCustomers() {
    try {
      setLoading(true);
      setError("");

      const data =
        await getCustomers();

      setCustomers(data);
    } catch (err) {
      setError(
        err.message ||
          "Failed to load customers"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoriteCustomers",
      JSON.stringify(
        favoriteCustomers
      )
    );
  }, [favoriteCustomers]);

  function toggleFavorite(
    customerId
  ) {
    setFavoriteCustomers(
      (prev) =>
        prev.includes(
          customerId
        )
          ? prev.filter(
              (id) =>
                id !==
                customerId
            )
          : [
              ...prev,
              customerId
            ]
    );

    setSelectedCustomer(
      null
    );
  }

  async function deleteCustomer(
    customerId
  ) {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCustomerApi(
        customerId
      );

      setCustomers(
        (
          prevCustomers
        ) =>
          prevCustomers.filter(
            (
              customer
            ) =>
              customer.id !==
              customerId
          )
      );

      setFavoriteCustomers(
        (prev) =>
          prev.filter(
            (id) =>
              id !==
              customerId
          )
      );

      setSelectedCustomer(
        null
      );
    } catch (error) {
      alert(
        error.message ||
          "Failed to delete customer"
      );
    }
  }

  if (loading) {
    return (
      <LoadingMessage message="Loading customers..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
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
            Customers
          </h2>

          <p className="text-sm text-gray-500">
            Manage customer
            master data used
            in sales orders.
          </p>
        </div>

        <Link
          to="/customers/new"
        >
          <Button>
            Add Customer
          </Button>
        </Link>
      </div>

      {customers.length ===
      0 ? (
        <EmptyState
          title="No customers found"
          description="Create a customer before creating sales orders."
        />
      ) : (
        <Card>
          <div className="h-[350px] overflow-y-auto rounded-3xl border border-gray-300">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="sticky top-0 z-10">
                <tr className="border-b bg-green-100 text-gray-900">
                  <th className="px-4 py-4 text-lg font-bold">
                    Code
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Name
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Phone
                  </th>

                  <th className="px-4 py-4 text-lg font-bold">
                    Email
                  </th>
                </tr>
              </thead>

              <tbody>
                {customers.map(
                  (
                    customer
                  ) => (
                    <tr
                      key={
                        customer.id
                      }
                      onClick={() =>
                        setSelectedCustomer(
                          selectedCustomer ===
                            customer.id
                            ? null
                            : customer.id
                        )
                      }
                      className="relative cursor-pointer border-b hover:bg-gray-50 last:border-0"
                    >
                      <td className="px-4 py-4 font-medium text-gray-900">
                        {
                          customer.code
                        }
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {
                          customer.name
                        }
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        {customer.phone ||
                          "-"}
                      </td>

                      <td className="px-4 py-4 text-gray-700">
                        <div className="flex items-center justify-between">
                          <span>
                            {customer.email ||
                              "-"}
                          </span>

                          {favoriteCustomers.includes(
                            customer.id
                          ) && (
                            <span className="text-lg">
                              ❤️
                            </span>
                          )}
                        </div>
                      </td>

                      {selectedCustomer ===
                        customer.id && (
                        <td className="absolute right-4 top-12 z-50">
                          <div className="overflow-hidden rounded-lg border bg-white shadow-lg">
                            <button
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                toggleFavorite(
                                  customer.id
                                );
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                            >
                              ❤️ Add to
                              Favorites
                            </button>

                            <Link
                              to={`/customers/${customer.id}/edit`}
                              onClick={(
                                e
                              ) =>
                                e.stopPropagation()
                              }
                              className="block w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
                            >
                              ✏️ Update
                              Customer
                            </Link>

                            <button
                              onClick={(
                                e
                              ) => {
                                e.stopPropagation();

                                deleteCustomer(
                                  customer.id
                                );
                              }}
                              className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                            >
                              🗑 Delete
                              Customer
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
        </Card>
      )}
    </div>
  );
}

export default CustomersPage;