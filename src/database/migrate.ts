import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import { dbURL } from "../utils/utils.ts";

// Execute migration
const migrationsFolder = "./src/database/migrations";
const migrationClient = postgres(dbURL(), { max: 1 });
await migrate(drizzle(migrationClient), { migrationsFolder });

// Close connection
migrationClient.end();
