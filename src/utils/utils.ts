import { Sequelize } from 'sequelize';
import { userModel } from '../users/configs.ts';
import { wisdomModel } from '../wisdoms/configs.ts';

export const dbURL = () => process.env.DATABASE_URL as string;

export const dbConnect = async () => {
    // Connect to the DB
    const db = new Sequelize(dbURL(), { logging: console.log });

    // Define the models
    const user = db.define('User', userModel);
    const wisdom = db.define('Wisdom', wisdomModel);

    // Relations
    user.hasMany(wisdom);
    wisdom.belongsTo(user, { foreignKey: 'authorId' });

    return db;
};
