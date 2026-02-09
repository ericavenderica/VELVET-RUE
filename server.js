import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));

// Set default middlewares (logger, static, cors and no-cache)
// Point static to 'dist' where Vite builds the frontend
const middlewares = jsonServer.defaults({ 
  static: path.join(__dirname, 'dist') 
});

server.use(middlewares);

// Add custom middleware for rewriting /api/* to /* if needed, 
// but since we mount router at /api, we should be good.

// Mount JSON Server router at /api
server.use('/api', router);

// SPA Catch-all route
// Any request that isn't an API call or a static file (handled by middlewares)
// should return index.html so React Router can handle it.
server.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  } else {
    next();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Velvet Rue Server is running on port ${port}`);
});
