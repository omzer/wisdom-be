import { t } from 'elysia';

export const createCategoryValidation = { body: t.Object({ title: t.String({ minLength: 3 }) }) };
