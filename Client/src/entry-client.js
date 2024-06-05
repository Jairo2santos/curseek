import { createApp } from 'vue';
import App from './App.vue';
import createMyRouter from './router/router';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';

const app = createApp(App);
const head = createHead();
const router = createMyRouter(false);
const pinia = createPinia();

// Google Analytics script
head.push({
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-QNT69M33WS',
      async: true
    },
    {
      innerHTML: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QNT69M33WS');
      `,
      type: 'text/javascript'
    }
  ]
});

if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
}

app.use(router);
app.use(head);
app.use(pinia);

router.isReady().then(() => {
  app.mount('#app');
});
