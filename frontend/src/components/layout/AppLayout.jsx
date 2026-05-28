function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-emerald-500 shadow-lg">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Mini Business Operations
          </h1>

          <p className="mt-3 text-lg text-green-100">
            Manage products, customers, sales orders, and stock efficiently
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;