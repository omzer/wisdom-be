import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { USER_ROUTES } from './users/configs.ts';
import { WISDOM_ROUTES } from './wisdoms/configs.ts';
import { CATEGORY_ROUTES } from './category/configs.ts';
import jwt from '@elysiajs/jwt';
import { JWTConfigs, onBeforeMiddleware } from './common/utils.ts';
import { dbConnect } from './database/utils/utils.ts';

// Connect to the DB
export const db = await dbConnect();

// Start the server
const app = new Elysia()
    // Elysia settings
    .use(swagger())
    .onBeforeHandle(onBeforeMiddleware)
    // API routes
    .use(USER_ROUTES)
    .use(WISDOM_ROUTES)
    .use(CATEGORY_ROUTES)
    .use(jwt(JWTConfigs))
    // Server port
    .listen(3000);

console.log(`🦊 Elysia is running at on port ${app.server?.port}`);
