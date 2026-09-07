import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  omit: {
    usuario: { passwordHash: true },
  },
});
