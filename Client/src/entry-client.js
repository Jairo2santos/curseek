// src/entry-client.js
import { createApp } from 'vue';
import App from './App.vue';
import createMyRouter from './router/router';
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';

const app = createApp(App);
const head = createHead();
const router = createMyRouter(false);
const pinia = createPinia();

// Asumiendo que estás serializando el estado de Pinia para SSR y quieres rehidratarlo
if (window.__INITIAL_STATE__) {
  pinia.state.value = JSON.parse(window.__INITIAL_STATE__);
}

app.use(router);
app.use(head);
app.use(pinia);

router.isReady().then(() => {
  app.mount('#app');
});
