import { Elysia } from "elysia";

const routeSettings = {
  prefix: "/user",
  detail: { tags: ["User management"] },
};

export const USER_ROUTES = new Elysia(routeSettings)
  .post("/sign-in", () => "Sign in")
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile");
