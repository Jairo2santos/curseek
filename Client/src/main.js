import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import router from './router/router.js';
import axios from 'axios';

axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        
        router.push('/login').catch(err => {});
        localStorage.removeItem('token');
      }
      return Promise.reject(error);
    }
  );
  
const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);
app.mount('#app');
