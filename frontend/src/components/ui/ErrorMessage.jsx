function EmptyState({
  title = "No data found",
  description,
}) {
  return (
    <div className="rounded-lg border border-dashed bg-white p-6 text-center shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">
        {title}
      </h2>

      {description ? (
        <p className="mt-2 text-sm text-gray-600">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default EmptyState;