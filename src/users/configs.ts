import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { loginUser, signupUser } from './actions.ts';
import { userAPIsValidation } from './actionsValidations.ts';
import { defaultIDConfigs } from '../common/configs.ts';

// Model
export const userModel = {
    id: defaultIDConfigs,
    password: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/user', detail: { tags: ['User management'] } };
export const USER_ROUTES = new Elysia(routeSettings)
    .post('/login', loginUser, userAPIsValidation)
    .post('/sign-up', signupUser, userAPIsValidation);
