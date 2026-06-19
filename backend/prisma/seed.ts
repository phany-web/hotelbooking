import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Start seeding...");

  // Create Roles
  const superAdminRole = await prisma.role.upsert({
    where: {
      roleName: "SUPER_ADMIN",
    },
    update: {},
    create: {
      roleName: "SUPER_ADMIN",
    },
  });

  await prisma.role.upsert({
    where: {
      roleName: "ADMIN",
    },
    update: {},
    create: {
      roleName: "ADMIN",
    },
  });

  await prisma.role.upsert({
    where: {
      roleName: "STAFF",
    },
    update: {},
    create: {
      roleName: "STAFF",
    },
  });

  await prisma.role.upsert({
    where: {
      roleName: "CUSTOMER",
    },
    update: {},
    create: {
      roleName: "CUSTOMER",
    },
  });

  // Hash Password
  const hashedPassword = await bcrypt.hash(
    "super123",
    10
  );

  // Create Super Admin
  await prisma.user.upsert({
    where: {
      email: "superadmin@gmail.com",
    },
    update: {},
    create: {
      fullName: "Super Admin",
      email: "superadmin@gmail.com",
      password: hashedPassword,
      roleId: superAdminRole.id,
    },
  });

  console.log("✅ Seed completed");
  console.log("📧 Email: superadmin@gmail.com");
  console.log("🔑 Password: super123");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });