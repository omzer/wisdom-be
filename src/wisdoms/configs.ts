import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs, idParamValidation, limitOffsetValidation } from '../common/configs.ts';
import { createWisdom, deleteWisdom, generateWisdom, queryWisdoms, updateWisdom, viewWisdom } from './actions.ts';
import { createWisdomValidation, generateWisdomValidation, updateWisdomValidation } from './actionsValidations.ts';

// Model
export const wisdomModel = {
    id: defaultIDConfigs,
    content: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/wisdom', detail: { tags: ['Wisdom management'] } };
export const WISDOM_ROUTES = new Elysia(routeSettings)
    .get('/view/:id', viewWisdom, idParamValidation)
    .get('/all', queryWisdoms, limitOffsetValidation)
    .post('/create', createWisdom, createWisdomValidation)
    .delete('/delete/:id', deleteWisdom, idParamValidation)
    .put('/update/:id', updateWisdom, updateWisdomValidation)
    .get('/generate', generateWisdom, generateWisdomValidation);
