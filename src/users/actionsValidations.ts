import { t } from 'elysia';

const stringWithMinValue = (value: number) => t.String({ minLength: value });

export const userAPIsValidation = {
    query: t.Object({ username: stringWithMinValue(4), password: stringWithMinValue(8) }),
};
