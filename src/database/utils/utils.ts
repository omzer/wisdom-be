import { Sequelize } from 'sequelize';
import { wisdomModel } from '../../wisdoms/configs.ts';
import { userModel } from '../../users/configs.ts';
import { categoryModel } from '../../category/configs.ts';

export const dbURL = () => process.env.DATABASE_URL as string;

const isDBAuthenticated = async (db: Sequelize) => {
    try {
        await db.authenticate();
        console.log('💾 DB connected');
        return true;
    } catch (error: any) {
        console.error('💾🔥 Error DB', error?.message);
        return false;
    }
};

export const dbConnect = async () => {
    const db = new Sequelize(dbURL(), { logging: console.log });
    if (!(await isDBAuthenticated(db))) return;

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

    return db;
};
