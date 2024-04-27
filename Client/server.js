//server.js SSR
import express from 'express';
import render from './dist/server/entry-server.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';


dotenv.config({ path: '.env' });
const PORT = process.env.PORT || 2222;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use('/api', createProxyMiddleware({
  target: 'http://localhost:3333',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  },
  onProxyReq: function(proxyReq, req, res) {
    console.log('Proxying request:', req.originalUrl, 'to', proxyReq.protocol + '//' + proxyReq.host + proxyReq.path);
  }
}));


app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('*', async (req, res) => {
  const { appHtml, headTags, bodyAttrs, htmlAttrs } = await render({ url: req.originalUrl });
  fs.readFile(path.join(__dirname, 'dist', 'client', 'index.html'), 'utf-8', (err, data) => {
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

console.log(path.join(__dirname, 'dist', 'client', 'index.html'));



app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});