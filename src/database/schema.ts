import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  nickname: varchar("nickname", { length: 12 }).notNull(),
});
