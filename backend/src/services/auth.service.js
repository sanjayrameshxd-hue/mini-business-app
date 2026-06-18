const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

function createAppError(
  message,
  statusCode = 400
) {
  const error = new Error(
    message
  );

  error.statusCode =
    statusCode;

  return error;
}

function createToken(user) {
  return jwt.sign(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
}

async function registerUser(
  data
) {
  if (
    !data.name ||
    !data.email ||
    !data.password
  ) {
    throw createAppError(
      "Name, email, and password are required"
    );
  }

  if (
    data.password.length <
    6
  ) {
    throw createAppError(
      "Password must be at least 6 characters"
    );
  }

  const existingUser =
    await prisma.user.findUnique(
      {
        where: {
          email:
            data.email,
        },
      }
    );

  if (existingUser) {
    throw createAppError(
      "Email already exists"
    );
  }

  const passwordHash =
    await bcrypt.hash(
      data.password,
      10
    );

  const user =
    await prisma.user.create(
      {
        data: {
          name:
            data.name,
          email:
            data.email,
          passwordHash,
          role:
            "SALES_USER",
        },
      }
    );

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

async function loginUser(
  data
) {
  if (
    !data.email ||
    !data.password
  ) {
    throw createAppError(
      "Email and password are required"
    );
  }

  const user =
    await prisma.user.findUnique(
      {
        where: {
          email:
            data.email,
        },
      }
    );

  if (!user) {
    throw createAppError(
      "Invalid credentials",
      401
    );
  }

  const passwordMatches =
    await bcrypt.compare(
      data.password,
      user.passwordHash
    );

  if (
    !passwordMatches
  ) {
    throw createAppError(
      "Invalid credentials",
      401
    );
  }

  const token =
    createToken(user);

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email:
        user.email,
      role:
        user.role,
    },
  };
}

module.exports = {
  registerUser,
  loginUser,
};