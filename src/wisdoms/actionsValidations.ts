import { t } from 'elysia';
import { idParamValidation } from '../common/configs.ts';

export const createWisdomValidation = { body: t.Object({ content: t.String({ minLength: 12 }) }) };

export const updateWisdomValidation = { ...idParamValidation, ...createWisdomValidation };
