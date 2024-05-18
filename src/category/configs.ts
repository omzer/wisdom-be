import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs, limitOffsetValidation } from '../common/configs.ts';
import { createCategory, queryCategories } from './actions.ts';
import { createCategoryValidation } from './actionsValidations.ts';

// Model
export const categoryModel = {
    id: defaultIDConfigs,
    title: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/category', detail: { tags: ['Category management'] } };
export const CATEGORY_ROUTES = new Elysia(routeSettings)
    .get('/all', queryCategories, limitOffsetValidation)
    .post('/create', createCategory, createCategoryValidation);
