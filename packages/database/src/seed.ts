import type { User } from "@prisma/client";
import { prisma } from "./client";

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: "Tim Apple",
    email: "tim@apple.com",
  },
  {
    name: "Bill Door",
    email: "bill@microsoft.com",
  },
  {
    name: "Mark Sugarmount",
    email: "mark@facebook.com",
  },
  {
    name: "Jeff Money",
    email: "moneyman@amazon.com",
  },
  {
    name: "Richard Brandaughter",
    email: "ricky@virgin.com",
  },
] as Partial<User>[];

void (async () => {
  try {
    await prisma.user.delete({ where: { email: "mark@amazon.com" } });
  } catch (e: unknown) {
    console.error(e);
  }
  try {
    await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email ?? undefined,
          },
          update: {
            ...user,
          },
          create: {
            ...user,
          },
        }),
      ),
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
