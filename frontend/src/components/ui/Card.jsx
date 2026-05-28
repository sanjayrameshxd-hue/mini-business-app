function Card({ title, children }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {title ? (
        <h2 className="mb-4 text-lg font-semibold text-slate-900">
          {title}
        </h2>
      ) : null}

      {children}
    </section>
  );
}

export default Card;