<template>
  <div class="flex-col max-w-screen-full md:flex-row mx-auto md:px-60 bg-gray-100 pb-12">
    <Notificacion v-if="showNotification" :message="notificationMessage" :type="notificationType"
      @close="showNotification = false" />
    <!-- Texto introductorio -->
    <div class="intro-text mb-4">
      <h1 class="text-4xl text-center py-12 lg:text-5xl font-bold text-gray-800">
        <span class="font-serif text-indigo-900">Blog | </span>Bienvenido
      </h1>
      <p class="text-md md:text-center text-left md:px-0 px-6 pb-4">
        Descubre las últimas tendencias, consejos y estrategias para potenciar tu carrera
        profesional.
        En CURSEEK, estamos comprometidos con tu desarrollo y éxito profesional. A través de este espacio, queremos
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
    <!-- Listado de blogs -->
    <div v-if="blogs.length" class="max-w-6xl mx-auto flex flex-wrap px-4">
      <div v-for="blog in blogs" :key="blog.slug" class="w-full md:w-1/2 lg:w-1/3 p-2">
        <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }"
          class="flex flex-col h-full bg-white rounded-lg shadow-sm hover:shadow-xl transition overflow-hidden">
          <img :src="blog.image" alt="Imagen del Blog" class="w-full h-48 object-cover">
          <div class="p-4 flex-grow">
            <h2 class="text-lg font-bold text-pastel-verde mb-2">{{ blog.title }}</h2>
            <p class="text-gray-700 text-md mb-4">{{ blog.content.substring(0, 150) + "..." }}</p>
            <div v-if="isAdmin" class="admin-buttons flex space-x-2 mt-4">
              <router-link :to="{ name: 'EditBlog', params: { slug: blog.slug } }"
                class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Editar</router-link>
              <button @click="deleteBlog(blog.slug)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Eliminar</button>
            </div>
          </div>
          <div class="text-right p-2 text-sm">
            {{ new Date(blog.date).toLocaleDateString() }}
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Cargando blogs...</p>
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
    await axios.delete(`http://localhost:3333/api/blogs/slug/${slug}`, {
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
    const response = await axios.get('http://localhost:3333/api/blogs');
    console.log(response.data);
    blogs.value = response.data;
  } catch (error) {
    console.error('Error al cargar los blogs:', error);
  }
});
</script>
