const customerService = require("../services/customer.service");

async function listCustomers(req, res, next) {
  try {
    const customers = await customerService.listCustomers();

    res.json(customers);
  } catch (error) {
    next(error);
  }
}

async function getCustomer(req, res, next) {
  try {
    const id = Number(req.params.id);

    const customer = await customerService.getCustomerById(id);

    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function createCustomer(req, res, next) {
  try {
    const customer = await customerService.createCustomer(req.body);

    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
}

async function updateCustomer(req, res, next) {
  try {
    const id = Number(req.params.id);

    const customer = await customerService.updateCustomer(
      id,
      req.body
    );

    res.json(customer);
  } catch (error) {
    next(error);
  }
}

async function deleteCustomer(req, res, next) {
  try {
    const id = Number(req.params.id);

    await customerService.deleteCustomer(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};