// Importaciones agrupadas
import { createRouter, createWebHistory } from 'vue-router';

// Importaciones de vistas generales
import Home from '../views/Home.vue';
import Nosotros from '../views/nosotros.vue';
import Login from '../views/login.vue';
import Profile from '../views/profile.vue';
import SignUp from '../views/signUp.vue';
import Error404 from '../views/error404.vue';
import blogList from '../views/blogs/blogList.vue'
import BlogForm from '../views/blogs/blogForm.vue';

// Importaciones de cursos (Lazy loading)
const CursosUTN = () => import('../views/coursesViews/utn/cursosUTN.vue');
const CursosUDEMY = () => import('../views/coursesViews/udemy/cursosUDEMY.vue');
const CursosCoursera = () => import('../views/coursesViews/coursera/cursosCoursera.vue');

// Importaciones de detalles de cursos (Lazy loading)
const DetalleCursoUTN = () => import('../views/coursesViews/utn/detalleCursoUTN.vue');
const DetalleCursoUdemy = () => import('../views/coursesViews/udemy/detalleCursoUDEMY.vue');
const DetalleCursoCoursera = () => import('../views/coursesViews/coursera/detalleCursoCoursera.vue');

// Importaciones de universidades (Lazy loading)
const UAB = () => import('../views/coursesViews/coursera/universidades/UAB.vue');
const UDLAC = () => import('../views/coursesViews/coursera/universidades/UDLAC.vue');
const UPCHILE = () => import('../views/coursesViews/coursera/universidades/UPCHILE.vue');
const UCHILE = () => import('../views/coursesViews/coursera/universidades/UCHILE.vue');
const UNAM = () => import('../views/coursesViews/coursera/universidades/UNAM.vue');

// blogs
const BlogDetail = () => import('../views/blogs/blogDetails.vue');

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/nosotros', name: 'Nosotros', component: Nosotros },
  { path: '/login', name: 'Login', component: Login },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/signUp', name: 'SignUp', component: SignUp },
  { path: '/blogs', name: 'blogList', component: blogList },
  { path: '/blogs/:blogId', name: 'BlogDetail', component: BlogDetail, props: true },
  { path: '/blog/new', name: 'NewBlog', component: BlogForm, props: true },
  { path: '/blog/edit/:blogId', name: 'EditBlog', component: BlogForm, props: true },
  { path: '/cursos/utn', name: 'CursosUTN', component: CursosUTN },
  { path: '/cursos/udemy', name: 'CursosUDEMY', component: CursosUDEMY },
  { path: '/cursos/coursera', name: 'CursosCoursera', component: CursosCoursera },
  { path: '/utn/curso/:slug', name: 'DetalleCursoUTN', component: DetalleCursoUTN, props: true },
  { path: '/udemy/cursos/:slug', name: 'DetalleCursoUdemy', component: DetalleCursoUdemy, props: true },
  { path: '/coursera/cursos/:slug', name: 'DetalleCursoCoursera', component: DetalleCursoCoursera, props: true },
  { path: '/coursera/universidades/uab', name: 'UAB', component: UAB, props: true },
  { path: '/coursera/universidades/udlac', name: 'UDLAC', component: UDLAC, props: true },
  { path: '/coursera/universidades/upchile', name: 'UPCHILE', component: UPCHILE, props: true },
  { path: '/coursera/universidades/uchile', name: 'UCHILE', component: UCHILE, props: true },
  { path: '/coursera/universidades/unam', name: 'UNAM', component: UNAM, props: true },
  { path: '/:pathMatch(.*)*', name: 'Error404', component: Error404 },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
