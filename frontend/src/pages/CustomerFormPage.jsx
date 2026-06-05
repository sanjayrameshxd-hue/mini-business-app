import {
  useState,
  useEffect
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  createCustomer,
  updateCustomer
} from "../api/customerApi";

import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import ErrorMessage from "../components/ui/ErrorMessage";

const initialForm = {
  code: "",
  name: "",
  phone: "",
  email: ""
};

function CustomerFormPage() {
  const [form, setForm] =
    useState(initialForm);

  const [error, setError] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [loadingCustomer,
    setLoadingCustomer] =
    useState(false);

  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const isEditMode =
    Boolean(id);

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    async function loadCustomer() {
      try {
        setLoadingCustomer(
          true
        );

        const response =
          await fetch(
            `http://localhost:3000/api/customers/${id}`
          );

        if (!response.ok) {
          throw new Error(
            "Failed to load customer"
          );
        }

        const data =
          await response.json();

        setForm({
          code:
            data.code || "",
          name:
            data.name || "",
          phone:
            data.phone ||
            "",
          email:
            data.email ||
            ""
        });
      } catch (err) {
        setError(
          err.message ||
            "Failed to load customer"
        );
      } finally {
        setLoadingCustomer(
          false
        );
      }
    }

    loadCustomer();
  }, [id, isEditMode]);

  function handleChange(
    event
  ) {
    const { name, value } =
      event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function validateForm() {
    if (!form.code.trim()) {
      return "Customer code is required";
    }

    if (!form.name.trim()) {
      return "Customer name is required";
    }

    return "";
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    const validationError =
      validateForm();

    if (validationError) {
      setError(
        validationError
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        code:
          form.code.trim(),
        name:
          form.name.trim(),
        phone:
          form.phone.trim() ||
          null,
        email:
          form.email.trim() ||
          null
      };

      if (
        isEditMode
      ) {
        await updateCustomer(
          id,
          payload
        );
      } else {
        await createCustomer(
          payload
        );
      }

      navigate(
        "/customers"
      );
    } catch (err) {
      setError(
        err.message ||
          "Failed to save customer"
      );
    } finally {
      setSaving(false);
    }
  }

  if (
    loadingCustomer
  ) {
    return (
      <p className="text-center text-gray-500">
        Loading customer...
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4">
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
          {isEditMode
            ? "Update Customer"
            : "Add Customer"}
        </h2>

        <p className="text-sm text-gray-500">
          {isEditMode
            ? "Update customer details."
            : "Create customer master data for future sales orders."}
        </p>
      </div>

      <Card>
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          {error ? (
            <ErrorMessage
              message={error}
            />
          ) : null}

          <div>
            <label
              htmlFor="code"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Customer Code
            </label>

            <input
              id="code"
              name="code"
              value={
                form.code
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="C001"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>

            <input
              id="name"
              name="name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="ABC Stores"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone
            </label>

            <input
              id="phone"
              name="phone"
              value={
                form.phone
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Optional"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              value={
                form.email
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Optional"
            />
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              disabled={
                saving
              }
            >
              {saving
                ? "Saving..."
                : isEditMode
                ? "Update Customer"
                : "Save Customer"}
            </Button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/customers"
                )
              }
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CustomerFormPage;