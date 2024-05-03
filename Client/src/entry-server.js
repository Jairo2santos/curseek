// src/entry-server.js
import { createSSRApp } from 'vue';
import App from './App.vue';
import createMyRouter from './router/router.js';
import { createHead } from '@vueuse/head';
import { renderToString } from '@vue/server-renderer';
import { renderSSRHead } from '@unhead/ssr';
import { createPinia } from 'pinia';

export default async (context) => {
  const app = createSSRApp(App);
  const router = createMyRouter(true);
  const head = createHead();
  const pinia = createPinia();

  app.use(router);
  app.use(pinia);  
  app.use(head);

  // Cargar cursos antes de renderizar la aplicación
  
  try {
    await router.push(context.url || '/');
    await router.isReady();

    if (router.currentRoute.value.matched.length === 0) {
      // No se encontraron rutas coincidentes, establece el código de estado 404
      context.res.statusCode = 404;
    }
    const appHtml = await renderToString(app, context);
    const payload = await renderSSRHead(head);
    const state = JSON.stringify(pinia.state.value);  

    return {
      appHtml,
      initialState: state,  
      headTags: payload.headTags,
      statusCode: context.res ? context.res.statusCode : 200,

    };
  } catch (error) {
    console.error("Error al renderizar el servidor:", error);
        console.error(error.stack);
        if (context.res) {
          context.res.statusCode = 500;
        }

    return { appHtml: '<h1>Error durante el renderizado del servidor</h1>', headTags: '' };
  }
};
