const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(response) {
  if (!response.ok) {
    let message = 'Something went wrong';

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getProducts() {
  const response = await fetch(
    `${API_BASE_URL}/api/products`
  );

  return handleResponse(response);
}

export async function getProductById(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${id}`
  );

  return handleResponse(response);
}

export async function createProduct(product) {
  const response = await fetch(
    `${API_BASE_URL}/api/products`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }
  );

  return handleResponse(response);
}

export async function updateProduct(id, product) {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }
  );

  return handleResponse(response);
}

export async function deleteProduct(id) {
  const response = await fetch(
    `${API_BASE_URL}/api/products/${id}`,
    {
      method: 'DELETE'
    }
  );

  return handleResponse(response);
}