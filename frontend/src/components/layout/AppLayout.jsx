import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package
} from "lucide-react";

function AppLayout({ children }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition ${
      isActive
        ? "bg-green-100 text-green-800"
        : "text-slate-600 hover:bg-green-50"
    }`;

  return (
    <div className="min-h-screen bg-[#f7faf7]">
      {/* Header */}
      <header className="border-b border-green-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-6">
          {/* Logo + Title */}
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-4xl">
              📦
            </div>

            <div>
              <h1 style={{
            color: "#000000",
            fontSize: "40px",
            fontWeight: "bold",
            }}>
                Mini Business Operations
              </h1>

              <p className="mt-2 text-xl text-slate-500">
                Products, customers, sales orders,
                and stock
              </p>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={linkClass}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </NavLink>

            <NavLink
              to="/products"
              className={linkClass}
            >
              <Package size={20} />
              Products
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Page content */}
      <main className="mx-auto max-w-7xl px-10 py-14">
        {children}
      </main>
    </div>
  );
}

export default AppLayout;