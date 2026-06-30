const bcrypt = require("bcryptjs");
const prisma = require("../src/lib/prisma");

async function main() {
  const passwordHash = await bcrypt.hash("newpassword123", 10);

  await prisma.user.update({
    where: {
      email: "admin@example.com",
    },
    data: {
      passwordHash,
    },
  });

  console.log("Password reset successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });