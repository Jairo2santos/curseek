// Importaciones agrupadas
import { createRouter as _createRouter, createWebHistory, createMemoryHistory } from 'vue-router';

// Importaciones de vistas generales
import Home from '../views/home.vue';
import Nosotros from '../views/nosotros.vue';
import Login from '../views/login.vue';
import Profile from '../views/profile.vue';
import SignUp from '../views/signUp.vue';
import Error404 from '../views/error404.vue';
import { handleExternalLink } from '../middlewares/redirectMiddleware';

//recuperar pass
const PasswordRecovery = () => import('../views/passwordRecovery.vue');
const ResetPassword = () => import('../views/resetPassword.vue');

// Importaciones de cursos (Lazy loading)
const CursosUTN = () => import('../views/coursesViews/utn/cursosUTN.vue');
const CursosUDEMY = () => import('../views/coursesViews/udemy/cursosUDEMY.vue');
const CursosCoursera = () => import('../views/coursesViews/coursera/cursosCOURSERA.vue');

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

// Blogs (Aplicando Lazy Loading)
const BlogList = () => import('../views/blogs/blogList.vue');
const BlogDetail = () => import('../views/blogs/blogDetails.vue');
const BlogForm = () => import('../views/blogs/blogForm.vue');

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
  { path: '/link-saliente', name: 'LinkSaliente',  component: () => import('../views/linkSaliente.vue'),  meta: { title: 'Saliendo de Curseek - Curseek' } },
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

return router;
}