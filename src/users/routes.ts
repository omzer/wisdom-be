import { Elysia } from 'elysia';
import { signupUser } from './actions.ts';
import { signupUserValidation } from './actionsValidations.ts';

const routeSettings = {
    prefix: '/user',
    detail: { tags: ['User management'] },
};

export const USER_ROUTES = new Elysia(routeSettings).post('/sign-up', signupUser, signupUserValidation);
