import { createApp } from 'vue';
import { createMetaManager } from 'vue-meta'
import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        // Aquí, necesitas invocar una redirección usando vue-router.
        // Asumiendo que tienes una ruta de inicio de sesión configurada como '/login'
        router.push('/login').catch(err => {});
        // Opcionalmente, puedes querer limpiar el token almacenado
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );
  
const app = createApp(App);
app.use(router);
app.use(createMetaManager())
app.mount('#app');
