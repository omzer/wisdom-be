import { DataTypes } from 'sequelize';
import { Elysia } from 'elysia';
import { defaultIDConfigs } from '../common/configs.ts';

// Model
export const wisdomModel = {
    id: defaultIDConfigs,
    content: { type: DataTypes.STRING, allowNull: false },
};

// Routes
const routeSettings = { prefix: '/wisdom', detail: { tags: ['Wisdom management'] } };
export const WISDOM_ROUTES = new Elysia(routeSettings)
    .post('/create', 'New wisdom to be created')
    .put('/update', 'Update wisdom details')
    .delete('/delete', 'Remove wisdom')
    .get('/all', 'Query all wisdoms')
    .post('/view', 'View wisdom with its details');
