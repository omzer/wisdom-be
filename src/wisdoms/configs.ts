import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs, idParamValidation, limitOffsetValidation } from '../common/configs.ts';
import { createWisdom, updateWisdom, viewAll, viewWisdom } from './actions.ts';
import { createWisdomValidation, updateWisdomValidation } from './actionsValidations.ts';

// Model
export const wisdomModel = {
    id: defaultIDConfigs,
    content: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/wisdom', detail: { tags: ['Wisdom management'] } };
export const WISDOM_ROUTES = new Elysia(routeSettings)
    .get('/all', viewAll, limitOffsetValidation)
    .get('/view/:id', viewWisdom, idParamValidation)
    .put('/delete/:id', updateWisdom, idParamValidation)
    .post('/create', createWisdom, createWisdomValidation)
    .put('/update/:id', updateWisdom, updateWisdomValidation);
