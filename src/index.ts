import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';
import { dbConnect } from './utils/utils.ts';
import { USER_ROUTES, userModel } from './users/configs.ts';
import { Op } from 'sequelize';

// Connect to the DB
export const db = await dbConnect();
db.define('User', userModel);

// Serve APIs
const app = new Elysia().use(swagger()).use(USER_ROUTES).listen(4500);

const users = await db.models.User.findAll({ where: { createdAt: { [Op.lte]: new Date('2024-5-16 11:01:32') } } });

console.log(users.map(user => user.toJSON()));
