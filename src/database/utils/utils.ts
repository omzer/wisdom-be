import { Sequelize } from 'sequelize';
import { wisdomModel } from '../../wisdoms/configs.ts';
import { userModel } from '../../users/configs.ts';
import { categoryModel } from '../../category/configs.ts';

export const dbURL = () => process.env.DATABASE_URL as string;

export const dbConnect = async () => {
    // Connect to the DB
    console.log('Here');
    const db = new Sequelize(dbURL(), { logging: console.log });

    // Define the models
    const user = db.define('User', userModel);
    const wisdom = db.define('Wisdom', wisdomModel);
    const category = db.define('Category', categoryModel);

    // Relations
    // User and wisdom
    user.hasMany(wisdom);
    wisdom.belongsTo(user, { foreignKey: 'authorId' });

    // Wisdom and category
    wisdom.belongsToMany(category, { through: 'WisdomCategories' });
    category.belongsToMany(wisdom, { through: 'WisdomCategories' });

    // Sync DB with latest migrations
    await db.sync();

    return db;
};
