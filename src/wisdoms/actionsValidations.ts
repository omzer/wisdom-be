import { t } from 'elysia';
import { idParamValidation } from '../common/configs.ts';

export const createWisdomValidation = {
    body: t.Object({
        categories: t.String(),
        content: t.String({ minLength: 12 }),
    }),
};

export const updateWisdomValidation = { ...idParamValidation, ...createWisdomValidation };

export const generateWisdomValidation = { query: t.Object({ topic: t.String({ minLength: 3 }) }) };
