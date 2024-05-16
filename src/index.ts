import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { USER_ROUTES } from './users/configs.ts';
import { WISDOM_ROUTES } from './wisdoms/configs.ts';
import { CATEGORY_ROUTES } from './category/configs.ts';
import jwt from '@elysiajs/jwt';
import { dbConnect } from './database/utils/utils.ts';
import { JWTConfigs } from './common/utils.ts';

// Connect to the DB
export const db = await dbConnect();

// Serve APIs
new Elysia().use(swagger()).use(USER_ROUTES).use(WISDOM_ROUTES).use(CATEGORY_ROUTES).use(jwt(JWTConfigs)).listen(4500);
