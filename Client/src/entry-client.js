//\src\entry-client.js
import { createApp } from 'vue';
import App from './App.vue';
import createMyRouter from '../src/router/router';
import { createHead } from '@vueuse/head';

const app = createApp(App);
const head = createHead();
const router = createMyRouter(false);

app.use(router);
app.use(head);

router.isReady().then(() => {
  app.mount('#app');
});
