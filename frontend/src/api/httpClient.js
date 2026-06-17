export async function handleResponse(
  response
) {
  const data =
    await response
      .json()
      .catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Request failed"
    );
  }

  return data;
}