// server.js SSR
import express from 'express';
import render from './dist/server/entry-server.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import NodeCache from 'node-cache';

dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 2222;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ssrCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:3333',
    changeOrigin: true,
    pathRewrite: {'^/api': ''}
}));

app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('*', async (req, res) => {
    let cachedContent = ssrCache.get(req.url);
    if (cachedContent) {
        return res.send(cachedContent);
    }

    try {
        const { appHtml, headTags, bodyAttrs, htmlAttrs, statusCode } = await render({ url: req.originalUrl });
        if (!appHtml || statusCode === 404) { 
          res.status(404).send('Página no encontrada');
        } else {
          fs.readFile(path.join(__dirname, 'dist', 'client', 'index.html'), 'utf-8', (err, data) => {
            if (err) {
              console.error('Error reading index.html', err);
              return res.status(500).send('Server error');
            }
            data = data.replace('<!--app-html-->', appHtml)
                       .replace('<!--headTags-->', headTags)
                       .replace('<html lang="es">', `<html lang="es" ${htmlAttrs}>`)
                       .replace('<body>', `<body ${bodyAttrs}>`);
            res.status(200).send(data);
          });
        }
      } catch (error) {
        console.error("SSR rendering error:", error);
        res.status(500).send('Internal server error');
      }
    });

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
