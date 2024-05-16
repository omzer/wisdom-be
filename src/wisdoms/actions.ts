import { db } from '../index.ts';

export const createWisdom = async ({ body, set }: any) => {
    const { content } = body;
    const wisdom = await db.models.Wisdom.create({ content, authorId: set.userId });
    return wisdom.toJSON();
};

export const viewWisdom = async ({ params, set }: any) => {
    const { id } = params;
    const wisdom = await db.models.Wisdom.findOne({ where: { id }, include: 'User' });
    return wisdom ? wisdom.toJSON() : (set.status = 404);
};

export const updateWisdom = async ({ params, body, set }: any) => {
    const { id } = params;
    const { content } = body;
    const wisdom: any = await db.models.Wisdom.findOne({ where: { id } });

    // Wisdom does not exist
    if (!wisdom) return (set.status = 404);
    // User is not an author
    if (wisdom.authorId !== set.userId) return (set.status = 401);

    await wisdom.update({ content });
};
