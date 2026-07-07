const request = require("supertest");
const app = require("../../src/app");

async function getAdminToken() {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: process.env.TEST_ADMIN_EMAIL,
      password: process.env.TEST_ADMIN_PASSWORD,
    });

  return response.body.token;
}

module.exports = {
  getAdminToken,
};