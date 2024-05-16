import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { signupUser } from './actions.ts';
import { signupUserValidation } from './actionsValidations.ts';
import { defaultIDConfigs } from '../common/configs.ts';

// Model
export const userModel = {
    id: defaultIDConfigs,
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/user', detail: { tags: ['User management'] } };
export const USER_ROUTES = new Elysia(routeSettings).post('/sign-up', signupUser, signupUserValidation);
