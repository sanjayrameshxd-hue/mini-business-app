import {
  Routes,
  Route,
} from "react-router-dom";

import DashboardPage from "../pages/DashboardPage.jsx";

import ProductsPage from "../pages/ProductsPage.jsx";
import ProductFormPage from "../pages/ProductFormPage.jsx";

import CustomersPage from "../pages/CustomersPage.jsx";
import CustomerFormPage from "../pages/CustomerFormPage.jsx";

import SalesOrdersPage from "../pages/SalesOrdersPage.jsx";
import SalesOrderCreatePage from "../pages/SalesOrderCreatePage.jsx";
import SalesOrderDetailPage from "../pages/SalesOrderDetailPage.jsx";

function AppRoutes() {
  return (
    <Routes>
      {/* Dashboard */}
      <Route
        path="/"
        element={<DashboardPage />}
      />

      {/* Products */}
      <Route
        path="/products"
        element={<ProductsPage />}
      />

      <Route
        path="/products/new"
        element={<ProductFormPage />}
      />

      <Route
        path="/products/:id/edit"
        element={<ProductFormPage />}
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={<CustomersPage />}
      />

      <Route
        path="/customers/new"
        element={<CustomerFormPage />}
      />

      <Route
        path="/customers/:id/edit"
        element={<CustomerFormPage />}
      />

      {/* Sales Orders */}
      <Route
        path="/sales-orders"
        element={<SalesOrdersPage />}
      />

      <Route
        path="/sales-orders/new"
        element={<SalesOrderCreatePage />}
      />

      <Route
        path="/sales-orders/:id"
        element={<SalesOrderDetailPage />}
      />
    </Routes>
  );
}

export default AppRoutes;