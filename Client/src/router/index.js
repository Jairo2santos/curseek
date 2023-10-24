import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import cursos from '../views/cursos.vue';
import login from '../views/login.vue';
import cursosCategory from '../views/cursosCategory.vue';
import EditarTitulo from "../views/EditarTitulo.vue";
import DetalleCurso from "../views/DetalleCurso.vue";
import profile from  "../views/profile.vue";
import signUp from  "../views/signUp.vue";

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
    path: "/editar-titulo/:courseId",
    name: "EditarTitulo",
    component: EditarTitulo,
    props: true
  },
   {
    path: "/curso/:id",
    name: "DetalleCurso",
    component: DetalleCurso,
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