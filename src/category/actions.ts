import { db } from '../index.ts';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const createCategory = async ({ body, set }: any) => {
    const { title } = body;
    await db.models.Category.create({ title });
    return (set.status = 201);
};

export const viewCategory = async ({ params, set }: any) => {
    const { id } = params;
    const wisdom = await db.models.Wisdom.findOne({
        where: { id },
        include: [{ model: db.models.User, attributes: { exclude: ['password'] } }],
    });
    return wisdom ? wisdom.toJSON() : (set.status = 404);
};

export const updateCategory = async ({ params, body, set }: any) => {
    const { id } = params;
    const { content } = body;
    const wisdom: any = await db.models.Wisdom.findOne({ where: { id } });

    // Wisdom does not exist
    if (!wisdom) return (set.status = 404);
    // User is not an author
    if (wisdom.authorId !== set.userId) return (set.status = 401);

    await wisdom.update({ content });
};

export const queryCategories = async ({ query }: any) => {
    const { limit, offset } = query;
    const categories = await db.models.Category.findAll({ limit, offset });
    return categories.map(category => category.toJSON());
};

export const generateCategory = async ({ query }: any) => {
    const { topic } = query;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
        history: [
            { role: 'user', parts: [{ text: 'I will send you topic, and you need to give me a wisdom about it' }] },
            { role: 'user', parts: [{ text: 'I just want you to send the wisdom, nothing else' }] },
            { role: 'user', parts: [{ text: 'If you cannot find sth on the web, make one up' }] },
            { role: 'model', parts: [{ text: "Sounds great! let's do it!" }] },
        ],
    });
    const result = await chat.sendMessage(topic);
    return result.response.text();
};

export const deleteCategory = async ({ params, set }: any) => {
    const { id } = params;
    const wisdom: any = await db.models.Wisdom.findOne({ where: { id } });

    // Wisdom does not exist
    if (!wisdom) return (set.status = 404);
    // User is not an author
    if (wisdom.authorId !== set.userId) return (set.status = 401);

    await wisdom.destroy();
};
