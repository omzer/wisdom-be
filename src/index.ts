import { Elysia } from 'elysia';
import swagger from '@elysiajs/swagger';

// Connect to the DB

// Serve APIs
const app = new Elysia().use(swagger()).get('/', 'Hello').listen(4500);

// Log status
console.log(`App is running on port ${app.server?.port} 🦊`);
