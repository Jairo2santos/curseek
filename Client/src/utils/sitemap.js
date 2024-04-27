import fs from 'fs';
import fetch from 'node-fetch';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';


async function getDynamicRoutes() {
    try {
        const response = await fetch('http://localhost:3333/api/cursos/slugs');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Slugs fetched:", data); // Log de los slugs obtenidos
        return data.slugs;
    } catch (error) {
        console.error("Error al obtener las rutas dinámicas:", error);
        return [];
    }
}

  async function generateSitemap() {
    const dynamicRoutes = await getDynamicRoutes();
    const sitemapStream = new SitemapStream({ hostname: 'https://curseek.com' });

    const urls = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/nosotros', changefreq: 'monthly', priority: 0.7 },
        { url: '/login', changefreq: 'monthly', priority: 0.5 },
        { url: '/profile', changefreq: 'monthly', priority: 0.5 },
        { url: '/signUp', changefreq: 'monthly', priority: 0.5 },
        { url: '/blogs', changefreq: 'weekly', priority: 0.7 },
        { url: '/cursos/utn', changefreq: 'weekly', priority: 0.7 },
        { url: '/cursos/udemy', changefreq: 'weekly', priority: 0.7 },
        { url: '/cursos/coursera', changefreq: 'weekly', priority: 0.7 },
        { url: '/coursera/universidades/uab', changefreq: 'monthly', priority: 0.6 },
        { url: '/coursera/universidades/udlac', changefreq: 'monthly', priority: 0.6 },
        { url: '/coursera/universidades/upchile', changefreq: 'monthly', priority: 0.6 },
        { url: '/coursera/universidades/uchile', changefreq: 'monthly', priority: 0.6 },
        { url: '/coursera/universidades/unam', changefreq: 'monthly', priority: 0.6 },
      

    ];
    console.log("Dynamic routes to process:", dynamicRoutes.length); // Depura cuántas rutas dinámicas hay

    dynamicRoutes.forEach(course => {
        const { slug, source } = course;
        let path;
        switch (source) {
            case 'UTN':
                path = `/utn/curso/${slug}`;
                break;
            case 'UDEMY':
                path = `/udemy/cursos/${slug}`;
                break;
            case 'COURSERA':
                path = `/coursera/cursos/${slug}`;
                break;
        }
        if (path) {
            console.log("Adding URL to sitemap:", path); // Depura las URLs que se añaden
            urls.push({ url: path, changefreq: 'weekly', priority: 0.7 });
        }
    });

    urls.forEach(url => sitemapStream.write(url));
    sitemapStream.end();

    const sitemapOutput = (await streamToPromise(Readable.from(sitemapStream))).toString();
    fs.writeFileSync('sitemap.xml', sitemapOutput);
    console.log("Sitemap generated successfully"); // Confirma que el sitemap se generó
}

generateSitemap();