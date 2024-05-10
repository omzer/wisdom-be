import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres"; // Constants

// Constants
const dbURL = process.env.DATABASE_URL as string;
const migrationsFolder = "./src/database/migrations";

// Execute migration
const migrationClient = postgres(dbURL, { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder });

// Close connection
migrationClient.end();
