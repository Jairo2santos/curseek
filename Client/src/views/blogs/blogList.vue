<template>
  <div class="bg-pastel-fucsia min-h-screen p-5">
    <Notificacion v-if="showNotification" :message="notificationMessage" :type="notificationType" @close="showNotification = false" />
    <!-- Texto introductorio -->
    <div class="intro-text mb-4">
      <h1 class="text-3xl font-bold text-center">Bienvenido a Nuestro Blog</h1>
      <p class="text-xl text-center">Descubre las últimas tendencias, consejos y estrategias para potenciar tu carrera profesional.</p>
      <p>En CURSEEK, estamos comprometidos con tu desarrollo y éxito profesional. A través de este espacio, queremos compartir contigo valiosas insights, consejos prácticos y las últimas tendencias en el mundo laboral que te ayudarán a destacar en tu búsqueda de empleo y desarrollo de carrera. </p>
    </div>
    <!-- Botón para agregar un nuevo blog solo si es admin -->
    <div v-if="isAdmin" class="text-right mb-4">
      <router-link to="/blog/new" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Agregar nuevo blog</router-link>
    </div>
    <!-- Listado de blogs -->
    <div v-if="blogs.length" class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="blog in blogs" :key="blog.slug" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }">
          <img :src="blog.image" alt="Imagen del Blog" class="w-full h-48 object-cover">
        </router-link>
        <div class="p-4">
          <router-link :to="{ name: 'BlogDetail', params: { slug: blog.slug } }">
            <h2 class="text-2xl font-bold text-pastel-verde mb-2">{{ blog.title }}</h2>
          </router-link>
          <p class="text-gray-700 text-base mb-4">{{ blog.content.substring(0, 150) + "..." }}</p>
          <div class="text-pastel-fucsia text-sm">
            Publicado el {{ new Date(blog.date).toLocaleDateString() }}
          </div>
          <div v-if="isAdmin" class="admin-buttons flex space-x-2 mt-4">
            <!-- Asegúrate de actualizar esta ruta si decides implementar la edición usando slugs -->
            <router-link :to="{ name: 'EditBlog', params: { slug: blog.slug } }" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Editar</router-link>
            <button @click="deleteBlog(blog.slug)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Eliminar</button>
          </div>
        </div>
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
    await axios.delete(`http://localhost:3333/blogs/slug/${slug}`, {
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
    const response = await axios.get('http://localhost:3333/blogs');
    console.log(response.data);
    blogs.value = response.data;
  } catch (error) {
    console.error('Error al cargar los blogs:', error);
  }
});
</script>
