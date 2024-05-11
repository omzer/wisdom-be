import { Elysia, t } from 'elysia';
import { db } from '../index.ts';
import { WisdomsTable } from '../database/schema.ts';

// Add wisdom
const addWisdom = ({ body }: any) => {
    // @ts-ignore
    return db.insert(WisdomsTable).values({
        content: body.content,
        categories: body.categories,
    });
};
const addWisdomSchema = {
    body: t.Object({ content: t.String(), categories: t.Array(t.String()) }),
};

// Wisdom routes
const routeSettings = { prefix: '/wisdom', detail: { tags: ['Wisdoms'] } };
export const WISDOM_ROUTES = new Elysia(routeSettings).post('/add', addWisdom, addWisdomSchema);
