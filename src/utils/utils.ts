import { Sequelize } from 'sequelize';

export const dbURL = () => process.env.DATABASE_URL as string;

export const dbConnect = async () => {
    const sequelize = new Sequelize(dbURL());
    try {
        await sequelize.authenticate();
        console.log(`Connection to (${sequelize.getDatabaseName()}) established successfully 🔥`);
    } catch (error) {
        console.error('Unable to connect to the database 😭', error);
    }
    return sequelize;
};
