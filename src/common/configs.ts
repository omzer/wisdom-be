import { DataTypes } from 'sequelize';
import { t } from 'elysia';

export const defaultIDConfigs = {
    unique: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
};

export const idParamValidation = { params: t.Object({ id: t.String({ minLength: 36, maxLength: 36 }) }) };

export const limitOffsetValidation = {
    query: t.Object({
        limit: t.Numeric({ minimum: 1, default: 10 }),
        offset: t.Numeric({ minimum: 0, default: 0 }),
    }),
};
