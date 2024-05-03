// Importaciones agrupadas
import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

import Home from '../views/home.vue';
import Nosotros from '../views/nosotros.vue';
import Login from '../views/login.vue';
import Profile from '../views/profile.vue';
import SignUp from '../views/signUp.vue';
import Error404 from '../views/error404.vue';
import PasswordRecovery from '../views/passwordRecovery.vue';
import ResetPassword from '../views/resetPassword.vue';
import CursosUTN from '../views/coursesViews/utn/cursosUTN.vue';
import CursosUDEMY from '../views/coursesViews/udemy/cursosUDEMY.vue';
import CursosCoursera from '../views/coursesViews/coursera/cursosCOURSERA.vue';
import DetalleCursoUTN from '../views/coursesViews/utn/detalleCursoUTN.vue';
import DetalleCursoUdemy from '../views/coursesViews/udemy/detalleCursoUDEMY.vue';
import DetalleCursoCoursera from '../views/coursesViews/coursera/detalleCursoCoursera.vue';
import UAB from '../views/coursesViews/coursera/universidades/UAB.vue';
import UDLAC from '../views/coursesViews/coursera/universidades/UDLAC.vue';
import UPCHILE from '../views/coursesViews/coursera/universidades/UPCHILE.vue';
import UCHILE from '../views/coursesViews/coursera/universidades/UCHILE.vue';
import UNAM from '../views/coursesViews/coursera/universidades/UNAM.vue';
import BlogList from '../views/blogs/blogList.vue';
import BlogDetail from '../views/blogs/blogDetails.vue';
import BlogForm from '../views/blogs/blogForm.vue';
import LinkSaliente from '../views/linkSaliente.vue';

import { handleExternalLink } from '../middlewares/redirectMiddleware';

export default function createMyRouter(isServer) {
  console.log('Creating router. Is server:', isServer);

  const history = isServer ? createMemoryHistory() : createWebHistory();
const routes = [
  { path: '/', name: 'Home', component: Home, meta: { title: 'Inicio - Curseek' } },
  { path: '/nosotros', name: 'Nosotros', component: Nosotros, meta: { title: 'Nosotros - Curseek' } },
  { path: '/login', name: 'Login', component: Login, meta: { title: 'Login - Curseek' } },
  { path: '/profile', name: 'Profile', component: Profile, meta: { title: 'Perfil - Curseek' } },
  { path: '/signUp', name: 'SignUp', component: SignUp, meta: { title: 'Registro - Curseek' } },
  { path: '/blogs', name: 'BlogList', component: BlogList, meta: { title: 'Blog - Curseek' } },
  { path: '/blogs/:slug', name: 'BlogDetail', component: BlogDetail, props: true, meta: { title: 'Detalles del Blog - Curseek' } },
  { path: '/blog/new', name: 'NewBlog', component: BlogForm, meta: { title: 'Crear Blog - Curseek' } }, 
  { path: '/blog/edit/:slug', name: 'EditBlog', component: BlogForm, props: true, meta: { title: 'Editar Blog - Curseek' } },
  { path: '/cursos/utn', name: 'CursosUTN', component: CursosUTN, meta: { title: 'Cursos UTN - Curseek' } },
  { path: '/cursos/udemy', name: 'CursosUDEMY', component: CursosUDEMY, meta: { title: 'Cursos UDEMY - Curseek' } },
  { path: '/cursos/coursera', name: 'CursosCoursera', component: CursosCoursera, meta: { title: 'Cursos Coursera - Curseek' } },
  { path: '/utn/curso/:slug', name: 'DetalleCursoUTN', component: DetalleCursoUTN, props: true, meta: { title: 'Detalle Curso UTN - Curseek' } },
  { path: '/udemy/cursos/:slug', name: 'DetalleCursoUdemy', component: DetalleCursoUdemy, props: true, meta: { title: 'Detalle Curso Udemy - Curseek' } },
  { path: '/coursera/cursos/:slug', name: 'DetalleCursoCoursera', component: DetalleCursoCoursera, props: true, meta: { title: 'Detalle Curso Coursera - Curseek' } },
  { path: '/coursera/universidades/uab', name: 'UAB', component: UAB, props: true, meta: { title: 'Universidad Autónoma de Barcelona - Curseek' } },
  { path: '/coursera/universidades/udlac', name: 'UDLAC', component: UDLAC, props: true, meta: { title: 'Universidad de Las Américas Puebla - Curseek' } },
  { path: '/coursera/universidades/upchile', name: 'UPCHILE', component: UPCHILE, props: true, meta: { title: 'Universidad de Chile - Curseek' } },
  { path: '/coursera/universidades/uchile', name: 'UCHILE', component: UCHILE, props: true, meta: { title: 'Universidad de Chile - Curseek' } },
  { path: '/coursera/universidades/unam', name: 'UNAM', component: UNAM, props: true, meta: { title: 'Universidad Nacional Autónoma de México - Curseek' } },
  { path: '/password-recovery', name: 'PasswordRecovery', component: PasswordRecovery, meta: { title: 'Recuperación de Contraseña - Curseek' } },
  { path: '/reset-password', name: 'ResetPassword ', component: ResetPassword,  meta: { title: 'Reseteo de Contraseña - Curseek' } },
  { path: '/link-saliente', name: 'LinkSaliente', component: LinkSaliente, meta: { title: 'Saliendo de Curseek - Curseek' } },
  { path: '/:pathMatch(.*)*', name: 'Error404', component: Error404, meta: { title: 'Página no encontrada - Curseek' } },
];

const router = _createRouter({ history, routes });

router.beforeEach((to, from, next) => {
  if (to.query.isExternal === 'true') {
    handleExternalLink(next, to.query.url);
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next({ name: 'Error404' });
  } else {
    next(); 
  }
});


return router;
}