import { db } from '../index.ts';

export const createCategory = async ({ body, set }: any) => {
    const { title } = body;
    await db.models.Category.create({ title });
    return (set.status = 201);
};

export const queryCategories = async ({ query }: any) => {
    const { limit, offset } = query;
    const categories = await db.models.Category.findAll({ limit, offset });
    return categories.map(category => category.toJSON());
};
