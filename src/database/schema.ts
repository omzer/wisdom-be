import { integer, pgEnum, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    password: varchar('password').notNull(),
});

const WisdomType = pgEnum('WisdomType', ['human', 'ai']);
export const WisdomsTable = pgTable('wisdoms', {
    id: serial('id').primaryKey(),
    content: varchar('content').notNull(),
    categories: varchar('categories').array().notNull(),
    type: WisdomType('type').default('human'),
    userId: integer('userId')
        .references(() => UsersTable.id)
        .notNull(),
});

export const CategoriesTable = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
});

export const WisdomsCategoriesTable = pgTable('wisdoms_categories', {
    wisdomId: integer('wisdom_id')
        .references(() => WisdomsTable.id)
        .primaryKey(),
    categoryId: integer('category_id')
        .references(() => CategoriesTable.id)
        .primaryKey(),
});
