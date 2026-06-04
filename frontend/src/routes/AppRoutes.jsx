import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import ProductsPage from '../pages/ProductsPage';
import ProductFormPage from '../pages/ProductFormPage';

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage />}
      />

      <Route
        path="/products"
        element={<ProductsPage />}
      />

      <Route
        path="/products/new"
        element={<ProductFormPage />}
      />
    </Routes>
  );
}

export default AppRoutes;