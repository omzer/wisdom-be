import { integer, pgEnum, pgTable, primaryKey, serial, varchar } from 'drizzle-orm/pg-core';

export const UsersTable = pgTable('users', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    password: varchar('password').notNull(),
    categories: integer('categories').array(),
});

export const WisdomType = pgEnum('WisdomType', ['human', 'ai']);
export const WisdomsTable = pgTable('wisdoms', {
    id: serial('id').primaryKey(),
    content: varchar('content').notNull(),
    categories: varchar('categories').array(),
    type: WisdomType('type').default('human'),
    userId: integer('userId')
        .references(() => UsersTable.id)
        .notNull(),
});

export const CategoriesTable = pgTable('categories', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull(),
});

export const WisdomCategoryTable = pgTable(
    'wisdom-category',
    {
        wisdomId: integer('wisdomId')
            .references(() => WisdomsTable.id)
            .notNull(),
        categoryId: integer('categoryId')
            .references(() => CategoriesTable.id)
            .notNull(),
    },
    table => ({ pk: primaryKey({ columns: [table.wisdomId, table.categoryId] }) })
);
