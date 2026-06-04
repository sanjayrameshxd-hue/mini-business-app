const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const customerRoutes = require("./routes/customer.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/products", productRoutes);
app.use("/api/customers", customerRoutes);

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;