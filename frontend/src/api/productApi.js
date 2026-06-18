import { handleResponse } from "./httpClient";
import { getAuthHeaders } from "./authHeaders";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export async function getProducts() {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function createProduct(
  productData
) {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(
        productData
      ),
    }
  );

  return handleResponse(response);
}

export async function updateProduct(
  id,
  productData
) {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${id}`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
      body: JSON.stringify(
        productData
      ),
    }
  );

  return handleResponse(response);
}

export async function deleteProduct(
  id
) {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${id}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (response.status === 204) {
    return true;
  }

  return handleResponse(response);
}