import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function portfolioApiPlugin(): Plugin {
  return {
    name: 'portfolio-api-middleware',
    configureServer(server) {
      attachPortfolioRoutes(server.middlewares);
    },
    configurePreviewServer(server) {
      attachPortfolioRoutes(server.middlewares);
    }
  };
}

function attachPortfolioRoutes(middlewares: any) {
  middlewares.use(async (req: any, res: any, next: any) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    if (url.pathname === '/api/portfolio/catalog') {
      try {
        const { defaultPortfolioService } = require('./functions/lib/portfolioBackend');
        const forceRefresh = url.searchParams.get('refresh') === 'true';
        const catalog = await defaultPortfolioService.getCatalog(forceRefresh);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=60');
        res.statusCode = 200;
        res.end(JSON.stringify(catalog));
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (url.pathname === '/api/portfolio/image') {
      const fileId = url.searchParams.get('fileId');
      if (!fileId) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'fileId query parameter is required.' }));
        return;
      }
      try {
        const { defaultPortfolioService } = require('./functions/lib/portfolioBackend');
        await defaultPortfolioService.streamDriveImage(fileId, res);
      } catch (err: any) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    next();
  });
}

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react(), portfolioApiPlugin()],
})
