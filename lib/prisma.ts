/**
 * lib/prisma.ts
 *
 * Singleton Prisma client using the Turso (libSQL) driver adapter.
 *
 * WHY TURSO INSTEAD OF LOCAL SQLITE:
 * Vercel's production filesystem is ephemeral and read-only.  A plain local .db file
 * (e.g. file:./dev.db) would be reset to zero on every new deployment — all
 * registrations would be permanently lost.  Turso uses 100% standard SQLite syntax
 * and the identical Prisma workflow (schema, migrations, prisma studio), but the
 * database lives in Turso's persistent cloud infrastructure, so data is NEVER wiped
 * on redeploy.
 *
 * Environment variables required:
 *   DATABASE_URL        — e.g. libsql://your-db.turso.io
 *   DATABASE_AUTH_TOKEN — the Turso auth token for this database
 */

import { PrismaClient } from "@prisma/client";
import { PrismaLibSQL } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

// Prevent multiple Prisma Client instances in development (hot-reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  const libsql = createClient({
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  });

  const adapter = new PrismaLibSQL(libsql);

  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
