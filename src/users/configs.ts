import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { signupUser } from './actions.ts';
import { signupUserValidation } from './actionsValidations.ts';

// Model
export const userModel = {
    id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/user', detail: { tags: ['User management'] } };
export const USER_ROUTES = new Elysia(routeSettings).post('/sign-up', signupUser, signupUserValidation);
