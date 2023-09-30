import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import UTN from '../views/utn.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/utn',
    name: 'Cursos UTN',
    component: UTN
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;