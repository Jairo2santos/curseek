import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/home.vue';
import cursos from '../views/cursos.vue';
import cursosCategory from '../views/cursosCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos',
    name: 'Cursos UTN',
    component: cursos
  },
  {
    path: '/categoria/:categoria',
    name: 'cursosCategory',
    component: cursosCategory,
    props: true
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;