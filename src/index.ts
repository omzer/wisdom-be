import { Elysia } from "elysia";
import { USER_ROUTES } from "./users/routes.ts";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(swagger()).use(USER_ROUTES).listen(4500);

console.log(`App is running on port ${app.server?.port} 🦊`);
