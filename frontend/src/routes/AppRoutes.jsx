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

import LoginPage from "../pages/LoginPage.jsx";

import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Route */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      {/* Products */}
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/new"
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products/:id/edit"
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        }
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers/new"
        element={
          <ProtectedRoute>
            <CustomerFormPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers/:id/edit"
        element={
          <ProtectedRoute>
            <CustomerFormPage />
          </ProtectedRoute>
        }
      />

      {/* Sales Orders */}
      <Route
        path="/sales-orders"
        element={
          <ProtectedRoute>
            <SalesOrdersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales-orders/new"
        element={
          <ProtectedRoute>
            <SalesOrderCreatePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales-orders/:id"
        element={
          <ProtectedRoute>
            <SalesOrderDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;