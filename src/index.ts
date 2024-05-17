import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { USER_ROUTES } from './users/configs.ts';
import { WISDOM_ROUTES } from './wisdoms/configs.ts';
import { CATEGORY_ROUTES } from './category/configs.ts';
import jwt from '@elysiajs/jwt';
import { JWTConfigs, onBeforeMiddleware } from './common/utils.ts';

// Connect to the DB
export const db = {};

// Start the server
new Elysia()
    // Elysia settings
    .use(swagger())
    .onBeforeHandle(onBeforeMiddleware)
    // API routes
    .use(USER_ROUTES)
    .use(WISDOM_ROUTES)
    .use(CATEGORY_ROUTES)
    .use(jwt(JWTConfigs))
    // Server port
    .listen(4500);
