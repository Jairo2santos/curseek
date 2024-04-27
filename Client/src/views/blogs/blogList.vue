<template>
      <seo-component
      :title="pageTitleSEO"
      :description="pageDescriptionSEO"
      :breadcrumbs="breadcrumbs"
    />
  <div class="flex-col max-w-screen-full md:flex-row mx-auto md:px-40 bg-gray-100 pb-12">
    <Notificacion v-if="showNotification" :message="notificationMessage" :type="notificationType"
      @close="showNotification = false" />
    <!-- Texto introductorio -->
    <div class="intro-text mb-4">
      <h1 class="text-4xl text-center md:py-12 py-6 md:text-4xl font-semibold text-gray-800">
        <span class="text-indigo-900">Blog | </span>Informes y Noticias
      </h1>
      <p class="hidden md:block text-md md:text-center text-left md:px-0 px-6 pb-4">
        Descubre las últimas tendencias, consejos y estrategias para potenciar tu carrera
        profesional.
        En CurSeek, estamos comprometidos con tu desarrollo y éxito profesional. A través de este espacio, queremos
        compartir contigo valiosas insights, consejos prácticos y las últimas tendencias en el mundo laboral que te
        ayudarán a destacar en tu búsqueda de empleo y desarrollo de carrera.
      </p>
    </div>
    <!-- Botón para agregar un nuevo blog solo si es admin -->
    <div v-if="isAdmin" class="text-right mb-4">
      <router-link to="/blog/new"
        class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Agregar
        nuevo blog</router-link>
      </div>
      
      <div class="md:flex">
        <div class="md:w-1/2 px-6 rounded-sm mb-auto border-r border-gray-200">
        <!-- Primera entrada del diario -->
        <div class="">
          <h2 class="entry-title font-semibold md:text-3xl text-2xl pb-2">
            Comparación entre Programación Tradicional y Inteligencia Artificial: Enfoques y Métodos
          </h2>
          <div class="entry-content text-justify text-md pb-4">
            <p>
              La programación tradicional se fundamenta en reglas lógicas y decisiones predefinidas que se aplican según
              el contexto del programa que estamos desarrollando. En contraste, la Inteligencia Artificial (IA) se apoya
              en el aprendizaje automático y la capacidad de adquirir conocimientos a partir de nuevos datos.
            </p>
          </div>
          <img src="../../assets/programacion-vs-ai.png" alt="" class="w-full items-center justify-center">
        </div>
        
        <div class="pt-6">
          <h2 class="entry-title font-semibold md:text-3xl text-2xl pb-2">
            Fortalecimiento de la Transición Educativa: Acceso y Permanencia en la Educación Superior
          </h2>
          <img src="../../assets/mujer-estudiando.jpg" alt="" class="w-full pt-2 pb-4 items-center justify-center">
          <div class="entry-content text-justify text-md pb-4">
            <p>
              Se busca mejorar la transición de estudiantes de secundaria a la Educación Superior, fortaleciendo la
              colaboración entre universidades y sistemas educativos provinciales. El objetivo es facilitar el acceso y
              la permanencia de los estudiantes, además de mejorar la enseñanza virtual y ofrecer orientación
              vocacional.
            </p>
          </div>
        </div>
      </div>

      <div class="md:w-1/2 pt-6 md:pt-0">
        <!-- Listado de blogs -->
        <div v-if="blogs.length" class="max-w-6xl mx-auto flex flex-wrap px-4">
          <div v-for="blog in blogs" :key="blog.slug" class="w-full md:w-1/2 lg:w-1/2 p-2">
            <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }"
              class="flex flex-col h-full rounded-sm hover:shadow-md transition overflow-hidden">
              <img :src="blog.image" alt="Imagen del Blog" class="w-full h-48 object-cover">
              <div class="flex-grow">
                <h2 class="text-lg p-1 font-semibold">{{ blog.title }}</h2>
                <!-- <p class="text-gray-700 text-sm mb-4">{{ blog.content.substring(0, 150) + "..." }}</p> -->
                <div v-if="isAdmin" class="admin-buttons flex space-x-2 mt-4">
                  <router-link :to="{ name: 'EditBlog', params: { slug: blog.slug } }"
                    class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Editar</router-link>
                  <button @click="deleteBlog(blog.slug)"
                    class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Eliminar</button>
                </div>
              </div>
              <div class="text-right p-2 text-xs">
                {{ new Date(blog.date).toLocaleDateString() }}
              </div>
            </router-link>
          </div>
        </div>
        <div v-else class="text-center">
          <p>Cargando blogs...</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import axios from '../../axiosConfig.js' 
import { onMounted, ref , computed} from 'vue';
import { useRouter } from 'vue-router';
import Notificacion from '../../components/Notificaciones.vue';
import { getFromLocalStorage} from '../../utils/localStorage'; // Importa tus utilidades
import SeoComponent from '../../components/SEO.vue';
import { useRoute } from 'vue-router';

const blogs = ref([]);
const router = useRouter();
const isAdmin = ref(getFromLocalStorage('userRole') === 'admin'); // Utiliza tu función de utilidad
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');
const route = useRoute();

//SEO

// Ejemplo de pageTitle y pageDescription
const pageTitleSEO = 'Blogs y noticias - CurSeek';
const pageDescriptionSEO = 'Sección de blogs de Curseek, un buscador personalizado de cursos';

// Usa la API de enrutamiento de Vue para obtener la ruta actual

// Crea una estructura de breadcrumbs reactiva basada en la ruta actual
const breadcrumbs = computed(() => {
  // Aquí puedes construir la lógica para tus breadcrumbs basada en route.path o route.params
  return [
    { text: 'Inicio', to: '/', active: route.path === '/' },
    { text: 'Blogs y contenidos', to: '/blogs', active: route.path === '/blogs' },
  
    // La última ruta es siempre activa y no tiene enlace
  ];
});

// Asegúrate de usar slugs correctamente para eliminar blogs
const deleteBlog = async (slug) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este blog?')) return;
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage('token')}` // Cambio aquí
      }
    });
    // Actualiza la lista de blogs eliminando el blog con el slug dado
    blogs.value = blogs.value.filter(blog => blog.slug !== slug);
    // Mostrar notificación de éxito
    showNotification.value = true;
    notificationMessage.value = 'Blog eliminado exitosamente';
    notificationType.value = 'success';
    
    // Redirige al usuario a la página principal de blogs o a cualquier otra página
    router.push({ name: 'BlogList' }); // Asegúrate de que 'BlogList' sea el nombre correcto de la ruta a la que deseas redirigir.
  } catch (error) {
    console.error('Error al eliminar el blog:', error);
    // Mostrar notificación de error
    showNotification.value = true;
    notificationMessage.value = 'Error al eliminar el blog';
    notificationType.value = 'error';
  }
};
const extractTextFromHTML = (htmlString, maxLength = 150) => {
  const strippedString = htmlString.replace(/<[^>]+>/g, ''); // Eliminar etiquetas HTML
  return strippedString.length > maxLength
    ? strippedString.substring(0, maxLength) + '...'
    : strippedString;
};
onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
    blogs.value = response.data;
  } catch (error) {
    console.error('Error al cargar los blogs:', error);
  }
});
</script>
