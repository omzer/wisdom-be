import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { dbConnect } from './utils/utils.ts';

// Connect to the DB
const sequelize = await dbConnect();

// Serve APIs
const app = new Elysia().use(swagger()).get('/', 'Hello').listen(4500);
