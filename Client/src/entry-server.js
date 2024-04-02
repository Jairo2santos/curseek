import { createSSRApp } from 'vue';
import App from './App.vue';
import createMyRouter from './router/router.js';
import { createHead } from '@vueuse/head';
import { renderToString } from '@vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';

export default async (context) => {
  const app = createSSRApp(App);
  const router = createMyRouter(true);
  const head = createHead();

  app.use(router);
  app.use(head);

  try {
    await router.push(context.url || '/');
    await router.isReady();

    const appHtml = await renderToString(app, context);
    const payload = await renderSSRHead(head);

    return {
      appHtml,
      headTags: payload.headTags,
      // ... y cualquier otra propiedad que necesites pasar
    };
  } catch (error) {
    console.error("Error al renderizar el servidor:", error);
    return { appHtml: '<h1>Error durante el renderizado del servidor</h1>', headTags: '' };
  }
};
