import {
  useState,
  useEffect
} from 'react';

import {
  Link,
  useNavigate,
  useParams
} from 'react-router-dom';

import {
  createProduct,
  updateProduct
} from '../api/productApi';

import Card from '../components/ui/Card';

const initialForm = {
  sku: '',
  name: '',
  price: '',
  stockQty: ''
};

function validateProductForm(form) {
  const errors = {};

  if (!form.sku.trim()) {
    errors.sku = 'SKU is required';
  }

  if (!form.name.trim()) {
    errors.name = 'Name is required';
  }

  if (Number(form.price) <= 0) {
    errors.price =
      'Price must be greater than zero';
  }

  if (Number(form.stockQty) < 0) {
    errors.stockQty =
      'Opening stock cannot be negative';
  }

  return errors;
}

function ProductFormPage() {
  const navigate =
    useNavigate();

  const { id } =
    useParams();

  const isEditMode =
    Boolean(id);

  const [form, setForm] =
    useState(initialForm);

  const [fieldErrors,
    setFieldErrors] =
    useState({});

  const [submitError,
    setSubmitError] =
    useState('');

  const [saving,
    setSaving] =
    useState(false);

  const [loadingProduct,
    setLoadingProduct] =
    useState(false);

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    async function loadProduct() {
      try {
        setLoadingProduct(true);

        const response =
          await fetch(
            `http://localhost:3000/api/products/${id}`
          );

        if (!response.ok) {
          throw new Error(
            'Failed to load product'
          );
        }

        const data =
          await response.json();

        setForm({
          sku:
            data.sku || '',
          name:
            data.name || '',
          price:
            data.price || '',
          stockQty:
            data.stockQty || ''
        });
      } catch (error) {
        setSubmitError(
          error.message ||
            'Failed to load product'
        );
      } finally {
        setLoadingProduct(
          false
        );
      }
    }

    loadProduct();
  }, [id, isEditMode]);

  function handleChange(
    event
  ) {
    const {
      name,
      value
    } = event.target;

    setForm(
      (previousForm) => ({
        ...previousForm,
        [name]: value
      })
    );
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    setSubmitError('');

    const errors =
      validateProductForm(
        form
      );

    setFieldErrors(
      errors
    );

    if (
      Object.keys(errors)
        .length > 0
    ) {
      return;
    }

    const payload = {
      sku:
        form.sku.trim(),
      name:
        form.name.trim(),
      price:
        Number(
          form.price
        ),
      stockQty:
        Number(
          form.stockQty
        )
    };

    try {
      setSaving(true);

      if (
        !isEditMode
      ) {
        await createProduct(
          payload
        );
      } else {
        await updateProduct(
          id,
          payload
        );
      }

      navigate(
        '/products'
      );
    } catch (error) {
      setSubmitError(
        error.message ||
          'Failed to save product'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loadingProduct) {
    return (
      <p className="text-center text-gray-500">
        Loading product...
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 style={{
              color:
                "#000000",
              fontSize:
                "32px",
              fontWeight:
                "bold"
            }}>
            {isEditMode
              ? 'Update Product'
              : 'Add Product'}
          </h2>

          <p className="text-sm text-gray-500">
            {isEditMode
              ? 'Refining the  essentials'
              : 'Create a new product master record'}
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-3 text-sm font-semibold 
                    text-white shadow-md transition duration-300 hover:scale-105 hover:shadow-lg 
                    hover:from-amber-600 hover:to-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Back to Products
        </Link>
      </div>

      <Card>
        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >
          {submitError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {
                submitError
              }
            </div>
          ) : null}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              SKU
            </label>

            <input
              name="sku"
              value={
                form.sku
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm"
              placeholder="Example: P001"
            />

            {fieldErrors.sku ? (
              <p className="mt-1 text-sm text-red-600">
                {
                  fieldErrors.sku
                }
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              name="name"
              value={
                form.name
              }
              onChange={
                handleChange
              }
              className="w-full rounded-md border px-3 py-2 text-sm shadow-sm"
              placeholder="Example: Notebook"
            />

            {fieldErrors.name ? (
              <p className="mt-1 text-sm text-red-600">
                {
                  fieldErrors.name
                }
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={
                  form.price
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                placeholder="Example: 50"
              />

              {fieldErrors.price ? (
                <p className="mt-1 text-sm text-red-600">
                  {
                    fieldErrors.price
                  }
                </p>
              ) : null}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Opening Stock
              </label>

              <input
                name="stockQty"
                type="number"
                min="0"
                step="1"
                value={
                  form.stockQty
                }
                onChange={
                  handleChange
                }
                className="w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                placeholder="Example: 100"
              />

              {fieldErrors.stockQty ? (
                <p className="mt-1 text-sm text-red-600">
                  {
                    fieldErrors.stockQty
                  }
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t pt-4">
            <Link
              to="/products"
              className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-100 hover:border-0"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={
                saving
              }
              className="rounded-md bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-100 hover:text-gray-900 disabled:opacity-50"
            >
              {saving
                ? 'Saving...'
                : isEditMode
                ? 'Update Product'
                : 'Save Product'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default ProductFormPage;