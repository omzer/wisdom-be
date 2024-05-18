import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs, idParamValidation, limitOffsetValidation } from '../common/configs.ts';
import { deleteWisdom, generateWisdom, queryWisdoms, updateWisdom, viewWisdom } from '../wisdoms/actions.ts';
import { generateWisdomValidation, updateWisdomValidation } from '../wisdoms/actionsValidations.ts';
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
    .delete('/delete/:id', deleteWisdom, idParamValidation)
    .post('/create', createCategory, createCategoryValidation)
    .put('/update/:id', updateWisdom, updateWisdomValidation)
    .get('/generate', generateWisdom, generateWisdomValidation);
