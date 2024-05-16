import { DataTypes } from 'sequelize';

export const defaultIDConfigs = {
    unique: true,
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
};
