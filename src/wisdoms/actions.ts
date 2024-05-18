import { db } from '../index.ts';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const createWisdom = async ({ body, set }: any) => {
    const { content, categories } = body;
    const wisdom = db.models.Wisdom.build({ content, authorId: set.userId });
    // @ts-ignore
    wisdom.addCategories(categories?.split(','));
    await wisdom.save();
    return (set.status = 201);
};

export const viewWisdom = async ({ params, set }: any) => {
    const { id } = params;
    const wisdom = await db.models.Wisdom.findOne({
        where: { id },
        include: [
            { model: db.models.User, attributes: ['id', 'username'] },
            { model: db.models.Category, attributes: ['title', 'id'], through: { attributes: [] } },
        ],
    });
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

export const queryWisdoms = async ({ query }: any) => {
    const { limit, offset } = query;
    const wisdoms = await db.models.Wisdom.findAll({ limit, offset });
    return wisdoms.map(wisdom => wisdom.toJSON());
};

export const generateWisdom = async ({ query }: any) => {
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

export const deleteWisdom = async ({ params, set }: any) => {
    const { id } = params;
    const wisdom: any = await db.models.Wisdom.findOne({ where: { id } });

    // Wisdom does not exist
    if (!wisdom) return (set.status = 404);
    // User is not an author
    if (wisdom.authorId !== set.userId) return (set.status = 401);

    await wisdom.destroy();
};
