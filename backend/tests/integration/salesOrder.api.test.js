const request = require("supertest");

const app = require("../../src/app");
const prisma = require("../../src/lib/prisma");
const { getAdminToken } = require("../helpers/auth");

describe("Sales order API flow", () => {
  let product;
  let customer;
  let salesOrder;
  let token;

  beforeAll(async () => {
    token = await getAdminToken();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET /health works", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("creates a product", async () => {
    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        sku: `TEST-PROD-${Date.now()}`,
        name: "Test Notebook",
        price: 50,
        stockQty: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.stockQty).toBe(10);

    product = response.body;
  });

  test("creates a customer", async () => {
    const response = await request(app)
      .post("/api/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: `TEST-CUST-${Date.now()}`,
        name: "Test Customer",
        phone: "9876543210",
        email: "test@example.com",
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();

    customer = response.body;
  });

  test("fails to create order without items", async () => {
    const response = await request(app)
      .post("/api/sales-orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customerId: customer.id,
        items: [],
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/at least one item/i);
  });

  test("creates a draft sales order", async () => {
    const response = await request(app)
      .post("/api/sales-orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customerId: customer.id,
        items: [
          {
            productId: product.id,
            quantity: 2,
            rate: 50,
          },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeDefined();
    expect(response.body.status).toBe("DRAFT");
    expect(Number(response.body.totalAmount)).toBe(100);

    salesOrder = response.body;
  });

  test("confirms the sales order and reduces stock", async () => {
    const response = await request(app)
      .post(`/api/sales-orders/${salesOrder.id}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("CONFIRMED");

    const updatedProduct = await prisma.product.findUnique({
      where: {
        id: product.id,
      },
    });

    expect(Number(updatedProduct.stockQty)).toBe(
      Number(product.stockQty) - 2
    );
  });

  test("does not allow double confirmation", async () => {
    const response = await request(app)
      .post(`/api/sales-orders/${salesOrder.id}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(
      /draft|already|confirmed/i
    );
  });

  test("rejects confirmation when stock is insufficient", async () => {
    const lowStockProductResponse = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send({
        sku: `TEST-LOW-${Date.now()}`,
        name: "Low Stock Product",
        price: 100,
        stockQty: 1,
      });

    const lowStockProduct = lowStockProductResponse.body;

    const customerResponse = await request(app)
      .post("/api/customers")
      .set("Authorization", `Bearer ${token}`)
      .send({
        code: `TEST-LOW-CUST-${Date.now()}`,
        name: "Low Stock Customer",
      });

    const testCustomer = customerResponse.body;

    const orderResponse = await request(app)
      .post("/api/sales-orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        customerId: testCustomer.id,
        items: [
          {
            productId: lowStockProduct.id,
            quantity: 5,
            rate: 100,
          },
        ],
      });

    const testOrder = orderResponse.body;

    const confirmResponse = await request(app)
      .post(`/api/sales-orders/${testOrder.id}/confirm`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(confirmResponse.status).toBe(400);
    expect(confirmResponse.body.message).toMatch(
      /stock|insufficient/i
    );
  });
});