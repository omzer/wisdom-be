import { Elysia } from "elysia";

const users = new Elysia({ prefix: "/user" })
  .post("/sign-in", () => "Sign in")
  .post("/sign-up", () => "Sign up")
  .post("/profile", () => "Profile");

new Elysia()
  .use(users)
  .get("/", () => "hello world")
  .listen(3000);
