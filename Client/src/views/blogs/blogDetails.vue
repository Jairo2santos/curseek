<template>
  <div class="bg-pastel-fucsia min-h-screen p-4">
    <seo-component
      :title="pageTitleSEO"
      :description="pageDescriptionSEO"
      :breadcrumbs="breadcrumbs"
    />
    <!-- Verifica si el blog ha sido cargado -->
    <div v-if="blog" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 pb-4">
      <h1 class="text-4xl font-semibold text-center pt-6 pb-4">{{ blog.title }}</h1>
      <!-- Imagen del Blog -->
      <img :src="blog.image" alt="Imagen destacada del blog" class="block mx-auto rounded-sm mb-4 w-1/2">

      <!-- Contenido del Blog -->
      <div class="md:col-span-1">
        <!-- Utiliza v-html para renderizar el contenido HTML del blog -->
        <div class="text-gray-700 prose whitespace-pre-line text-lg px-4" v-html="blog.content"></div>
        <div class="text-right text-sm mt-6 pr-4">
          {{ new Date(blog.date).toLocaleDateString() }}
        </div>
      </div>
    </div>
    <!-- Mensaje mientras se carga el blog o si no hay datos -->
    <div v-else class="text-center">
      <p>Cargando detalles del blog o blog no encontrado...</p>
    </div>
  </div>
<!-- Botones para administradores -->
<div v-if="blog && isAdmin" class="flex justify-end space-x-2 mt-4">
      <router-link :to="{ name: 'EditBlog', params: { slug: blog.slug } }"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Editar</router-link>
      <button @click="deleteBlog(blog.slug)"
        class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200">Eliminar</button>
    </div>

</template>

  
  <script setup>
  import axios from 'axios';
  import { onMounted, ref, computed} from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import SeoComponent from '../../components/SEO.vue';
  import { getFromLocalStorage} from '../../utils/localStorage'; // Importa tus utilidades
  const props = defineProps({
  slug: String,
});
  const route = useRoute();
const blog = ref(null);
const isAdmin = ref(getFromLocalStorage('userRole') === 'admin'); 
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
    { text: 'BLogs y contenidos', to: '/blogs', active: route.path === '/blogs' },
    ...blog.value ? [{ text: blog.value.title, to: '', active: true }] : [],
  ];
});

onMounted(async () => {
  try {
    const slug = route.params.slug; // Asegúrate de obtener el slug de los parámetros de la ruta
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/slug/${slug}`);
    blog.value = response.data;
  } catch (error) {
    console.error('Error al cargar el blog:', error);
  }
});
const deleteBlog = async (slug) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este blog?')) return;
  
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${slug}`, {
      headers: {
        Authorization: `Bearer ${getFromLocalStorage('token')}`
      }
    });
    alert('Blog eliminado exitosamente');
    router.push({ name: 'BlogList' }); // Nombre de la ruta a la lista de blogs
  } catch (error) {
    alert('Error al eliminar el blog');
    console.error('Error al eliminar el blog:', error);
  }
};

  </script>

  <style scoped>
  .custom-content h1 {
    color: #2b6cb0; /* un color azul, por ejemplo */
    text-align: center;
  }
</style>
  