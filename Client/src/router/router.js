import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Nosotros from "../views/nosotros.vue";
import cursosUTN from "../views/coursesViews/utn/cursosUTN.vue";
import cursosUDEMY from "../views/coursesViews/udemy/cursosUDEMY.vue";
import login from "../views/login.vue";
import DetalleCursoUTN from "../views/coursesViews/utn/detalleCursoUTN.vue";
import DetalleCursoUdemy from "../views/coursesViews/udemy/detalleCursoUDEMY.vue";
import profile from "../views/profile.vue";
import signUp from "../views/signUp.vue";
import error404 from "../views/error404.vue";
import cursosCoursera from "../views/coursesViews/coursera/cursosCoursera.vue";
import DetalleCursoCoursera from "../views/coursesViews/coursera/detalleCursoCoursera.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/nosotros",
    name: "Nosotros",
    component: Nosotros,
  },
  {
    path: "/cursos/utn",
    name: "Cursos UTN",
    component: cursosUTN,
  },
  {
    path: "/cursos/udemy",
    name: "Cursos UDEMY",
    component: cursosUDEMY,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/utn/curso/:slug",
    name: "DetalleCursoUTN",
    component: DetalleCursoUTN,
    props: true,
  },
  {
    path: "/udemy/cursos/:slug",
    name: "DetalleCursoUdemy",
    component: DetalleCursoUdemy,
    props: true,
  },
  {
    path: "/cursos/coursera",
    name: "Cursos Coursera",
    component: cursosCoursera,
  },
  {
    path: "/coursera/cursos/:slug",
    name: "DetalleCursoCoursera",
    component: DetalleCursoCoursera,
    props: true,
  },
  {
    path: "/profile/",
    name: "profile",
    component: profile,
    props: true,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: signUp,
  },
  { path: "/:pathMatch(.*)*", name: "error404", component: error404 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
