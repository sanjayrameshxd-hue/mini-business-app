import { handleResponse } from "./httpClient";
import { getAuthHeaders } from "./authHeaders";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export async function getSalesOrders() {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function getSalesOrderById(
  id
) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function getSalesOrder(
  id
) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}

export async function createSalesOrder(
  data
) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

export async function confirmSalesOrder(
  id
) {
  const response = await fetch(
    `${API_BASE_URL}/api/sales-orders/${id}/confirm`,
    {
      method: "POST",
      headers: getAuthHeaders(),
    }
  );

  return handleResponse(response);
}