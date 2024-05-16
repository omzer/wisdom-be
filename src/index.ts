import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { dbConnect } from './utils/utils.ts';
import { userModel } from './users/model.ts';
import { USER_ROUTES } from './users/routes.ts';

// Connect to the DB
export const db = await dbConnect();
db.define('User', userModel);

// Serve APIs
const app = new Elysia().use(swagger()).use(USER_ROUTES).listen(4500);

console.log(db.models);
