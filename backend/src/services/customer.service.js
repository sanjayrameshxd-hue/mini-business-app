const prisma = require("../lib/prisma");

function createError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateCustomerData(data) {
  if (!data.code || !data.code.trim()) {
    throw createError("Customer code is required");
  }

  if (!data.name || !data.name.trim()) {
    throw createError("Customer name is required");
  }
}

async function listCustomers() {
  return prisma.customer.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      id: "desc",
    },
  });
}

async function getCustomerById(id) {
  const customer = await prisma.customer.findFirst({
    where: {
      id,
      isActive: true,
    },
  });

  if (!customer) {
    throw createError("Customer not found", 404);
  }

  return customer;
}

async function createCustomer(data) {
  validateCustomerData(data);

  const existingCustomer = await prisma.customer.findUnique({
    where: {
      code: data.code.trim(),
    },
  });

  if (existingCustomer) {
    throw createError("Customer code already exists");
  }

  return prisma.customer.create({
    data: {
      code: data.code.trim(),
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
    },
  });
}

async function updateCustomer(id, data) {
  await getCustomerById(id);

  validateCustomerData(data);

  const existingCustomer = await prisma.customer.findFirst({
    where: {
      code: data.code.trim(),
      NOT: {
        id,
      },
    },
  });

  if (existingCustomer) {
    throw createError("Customer code already exists");
  }

  return prisma.customer.update({
    where: {
      id,
    },
    data: {
      code: data.code.trim(),
      name: data.name.trim(),
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
    },
  });
}

async function deleteCustomer(id) {
  await getCustomerById(id);

  return prisma.customer.update({
    where: {
      id,
    },
    data: {
      isActive: false,
    },
  });
}

module.exports = {
  listCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};