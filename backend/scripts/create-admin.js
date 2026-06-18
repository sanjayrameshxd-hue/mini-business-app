const bcrypt = require("bcryptjs");
const prisma = require("../src/lib/prisma");

async function main() {
  const passwordHash =
    await bcrypt.hash(
      "admin123",
      10
    );

  const admin =
    await prisma.user.upsert(
      {
        where: {
          email:
            "admin@example.com",
        },

        update: {},

        create: {
          name:
            "Admin User",
          email:
            "admin@example.com",
          passwordHash,
          role: "ADMIN",
        },
      }
    );

  console.log(
    "Admin user ready:",
    admin.email
  );
}

main()
  .catch((error) => {
    console.error(
      error
    );

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });