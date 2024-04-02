import express from 'express';
import render from './dist/server/entry-server.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

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
               //.replace('<!--bodyTags-->', bodyTags) // asegúrate de tener esto también en render
               // Usa atributos directamente si los tienes
               .replace('<html lang="es">', `<html lang="es" ${htmlAttrs}>`)
               .replace('<body>', `<body ${bodyAttrs}>`);
    res.send(data);
  });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
