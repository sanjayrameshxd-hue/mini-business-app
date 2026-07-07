const bcrypt = require("bcryptjs");
const prisma = require("./src/lib/prisma");

async function main() {
  const user = await prisma.user.findUnique({
    where: {
      email: "admin@example.com",
    },
  });

  console.log("User:", user.email);

  const matches = await bcrypt.compare(
    "admin123",
    user.passwordHash
  );

  console.log("Password matches:", matches);

  await prisma.$disconnect();
}

main();