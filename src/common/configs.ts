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
