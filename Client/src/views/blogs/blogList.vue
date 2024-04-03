<template>
  <div class="flex-col max-w-screen-full md:flex-row mx-auto md:px-48 bg-gray-100 pb-12">
    <Notificacion v-if="showNotification" :message="notificationMessage" :type="notificationType"
      @close="showNotification = false" />
    <!-- Texto introductorio -->
    <div class="intro-text mb-4">
      <h1 class="text-4xl text-center py-12 md:text-4xl font-semibold text-gray-800">
        <span class="text-indigo-900">Blog | </span>Informes y Noticias
      </h1>
      <p class="text-md md:text-center text-left md:px-0 px-6 pb-4">
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

    <div class="flex">
      <!-- Primera entrada del diario -->
      <div class="w-1/2 p-2 rounded-sm mb-auto">
        <div class="">
          <h2 class="entry-title font-semibold text-3xl pb-2">
            Fortalecimiento de la Transición Educativa: Acceso y Permanencia en la Educación Superior
          </h2>
          <div class="entry-content text-justify text-md pb-4">
            <p>
              Se busca mejorar la transición de estudiantes de secundaria a la Educación Superior, fortaleciendo la
              colaboración entre universidades y sistemas educativos provinciales. El objetivo es facilitar el acceso y
              la permanencia de los estudiantes, además de mejorar la enseñanza virtual y ofrecer orientación
              vocacional.
            </p>
          </div>
          <img src="../../assets/mujer-estudiando.jpg" alt="" class="w-full items-center justify-center">
        </div>
      </div>

      <!-- Segunda entrada del diario -->
      <div class="w-1/2">
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

    <div class="pt-6 flex">
      <div class="entry-content text-justify text-md pb-4">
        <h2 class="text-left font-semibold text-3xl pb-2">
          Comparación entre Programación Tradicional y Inteligencia Artificial: Enfoques y Métodos
        </h2>
        <p>
          La programación tradicional se fundamenta en reglas lógicas y decisiones predefinidas que se aplican según
          el contexto del programa que estamos desarrollando. En contraste, la Inteligencia Artificial (IA) se apoya
          en el aprendizaje automático y la capacidad de adquirir conocimientos a partir de nuevos datos.
        </p>
      </div>
      <img src="../../assets/programacion-vs-ai.png" alt="" class="w-96 items-center ml-4 justify-center">
    </div>

  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Notificacion from '../../components/Notificaciones.vue';

const blogs = ref([]);
const router = useRouter();
const isAdmin = ref(localStorage.getItem('userRole') === 'admin');
const showNotification = ref(false);
const notificationMessage = ref('');
const notificationType = ref('');

// Asegúrate de usar slugs correctamente para eliminar blogs
const deleteBlog = async (slug) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este blog?')) return;
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
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


onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
    console.log(response.data);
    blogs.value = response.data;
  } catch (error) {
    console.error('Error al cargar los blogs:', error);
  }
});
</script>
