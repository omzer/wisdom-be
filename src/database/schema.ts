import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UsersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("name", { length: 12 }).notNull(),
});
