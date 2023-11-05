import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import cursosUTN from '../views/coursesViews/utn/cursosUTN.vue';
import cursosUDEMY from '../views/coursesViews/udemy/cursosUDEMY.vue';
import login from '../views/login.vue';
import cursosCategory from '../views/cursosCategory.vue';
import DetalleCurso from '../views/coursesViews/utn/detalleCursoUTN.vue';
import DetalleCursoUdemy from '../views/coursesViews/udemy/detalleCursoUDEMY.vue';
import profile from  "../views/profile.vue";
import signUp from  "../views/signUp.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos/utn',
    name: 'Cursos UTN',
    component: cursosUTN
  },
  {
    path: '/cursos/udemy',
    name: 'Cursos UDEMY',
    component: cursosUDEMY
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/categoria/:categoria',
    name: 'cursosCategory',
    component: cursosCategory,
    props: true
  },
   {
    path: "/curso/:id",
    name: "DetalleCurso",
    component: DetalleCurso,
    props: true
  },
  {
    path: '/udemy/cursos/:id',
    name: 'DetalleCursoUdemy',
    component: DetalleCursoUdemy,
    props: true
  },
  {
    path: "/profile/",
    name: "profile",
    component: profile,
    props: true
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: signUp,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;