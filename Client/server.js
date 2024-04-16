import express from 'express';
import render from './dist/server/entry-server.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

const envConfig = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({ path: envConfig });

console.log("Environment:", process.env.NODE_ENV);
console.log("API URL:", process.env.VITE_API_URL);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3333', 
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
}));

app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('*', async (req, res) => {
  const { appHtml, headTags, bodyAttrs, htmlAttrs } = await render({ url: req.originalUrl });
  fs.readFile(path.resolve('./dist/client/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading index.html', err);
      return res.status(500).send('Server error');
    }
    data = data.replace('<!--app-html-->', appHtml)
               .replace('<!--headTags-->', headTags)
               //.replace('<!--bodyTags-->', bodyTags) 
               .replace('<html lang="es">', `<html lang="es" ${htmlAttrs}>`)
               .replace('<body>', `<body ${bodyAttrs}>`);
    res.send(data);
  });
});



const port = process.env.PORT || 2222;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});