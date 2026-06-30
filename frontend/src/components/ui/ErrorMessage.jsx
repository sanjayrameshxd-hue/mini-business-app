function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-4 rounded-md border border-red-300 bg-red-50 p-3">
      <p className="text-sm font-medium text-red-700">
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;