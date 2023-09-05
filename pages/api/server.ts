// pages/api/server.ts

import express from 'express';
import next from 'next';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {

  const server = express();

  // Apply API routes
  server.use('/api/posts', require('./posts'));

  // Handle Next.js page requests
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

});

export { server };