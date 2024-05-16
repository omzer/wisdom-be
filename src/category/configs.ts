import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs } from '../common/configs.ts';

// Model
export const categoryModel = {
    id: defaultIDConfigs,
    title: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/category', detail: { tags: ['Category management'] } };
export const CATEGORY_ROUTES = new Elysia(routeSettings).get('/all', 'Query all categories');
