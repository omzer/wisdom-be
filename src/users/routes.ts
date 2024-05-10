import { Elysia, t } from "elysia";
import { db } from "../index.ts";

// Query users
const queryUsers = ({ query }: any) => {
  return db.query.UsersTable.findMany({ limit: query.limit, offset: query.offset, columns: { id: false } });
};
const queryUsersSchema = {
  query: t.Object({ limit: t.Numeric({ minimum: 5 }), offset: t.Numeric({ minimum: 0 }) }),
};

// User routes
const routeSettings = { prefix: "/user", detail: { tags: ["Users"] } };
export const USER_ROUTES = new Elysia(routeSettings)
  .post("/sign-in", () => "Sign in")
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile")
  .get("/query", queryUsers, queryUsersSchema);
