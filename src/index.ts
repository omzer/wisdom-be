import { Elysia } from 'elysia';
import { USER_ROUTES } from './users/routes.ts';
import swagger from '@elysiajs/swagger';
import { dbURL } from './utils/utils.ts';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './database/schema.ts';
import { WISDOM_ROUTES } from './wisdoms/routes.ts'; // Connect to the DB

// Connect to the DB
export const db = drizzle(postgres(dbURL()), { schema, logger: true });

// Serve APIs
const app = new Elysia().use(swagger()).use(USER_ROUTES).use(WISDOM_ROUTES).listen(4500);

// Log status
console.log(`App is running on port ${app.server?.port} 🦊`);
