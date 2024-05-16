import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { dbConnect } from './utils/utils.ts';
import { USER_ROUTES } from './users/configs.ts';
import { WISDOM_ROUTES } from './wisdoms/configs.ts';
import { CATEGORY_ROUTES } from './category/configs.ts';

// Connect to the DB
export const db = await dbConnect();

// Serve APIs
const app = new Elysia().use(swagger()).use(USER_ROUTES).use(WISDOM_ROUTES).use(CATEGORY_ROUTES).listen(4500);
