import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { dbConnect } from './utils/utils.ts';
import { userModel } from './users/model.ts';

// Connect to the DB
export const db = await dbConnect();
db.define('User', userModel);

// Serve APIs
const app = new Elysia().use(swagger()).get('/', 'Hello').listen(4500);
