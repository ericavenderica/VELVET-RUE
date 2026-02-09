import jsonServer from 'json-server';
import path from 'path';
import fs from 'fs';

const server = jsonServer.create();

// Load DB to memory to avoid Read-Only file system errors on Vercel
const dbPath = path.join(process.cwd(), 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

const router = jsonServer.router(dbData);
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom middleware to handle POST/PUT correctly in memory (json-server does this automatically when an object is passed)
// But we need to ensure the request is rewritten if coming from /api prefix
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

server.use(router);

export default server;
