import { defineConfig } from "drizzle-kit";

export default defineConfig({
  strict: true,
  verbose: true,
  dialect: "postgresql",
  out: "./src/database/migrations",
  schema: "./src/database/schema.ts",
  dbCredentials: { url: process.env.DATABASE_URL as string },
});
