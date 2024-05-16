import { t } from 'elysia';

export const signupUserValidation = { query: t.Object({ name: t.String(), password: t.String() }) };
