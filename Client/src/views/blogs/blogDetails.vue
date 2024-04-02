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
      <div class="md:col-span-1 m-auto">
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
  import { onMounted, ref, computed, watch} from 'vue';
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

// Establece el título de la página basado en el título del blog
const pageTitleSEO = computed(() => {
  return blog.value ? `${blog.value.title} - CurSeek` : 'Blogs y noticias - CurSeek';
});

// Establece la descripción de la página usando los primeros 160 caracteres del contenido del blog
const pageDescriptionSEO = computed(() => {
  if (blog.value && blog.value.content) {
    // Crea un elemento div temporal y establece su HTML al contenido del blog
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = blog.value.content;
    // Extrae el texto y usa los primeros 160 caracteres para la descripción
    const plainText = tempDiv.textContent || tempDiv.innerText || "";
    return plainText.slice(0, 160);
  } else {
    return 'Sección de blogs de Curseek, un buscador personalizado de cursos';
  }
});
// Usa la API de enrutamiento de Vue para obtener la ruta actual

// Crea una estructura de breadcrumbs reactiva basada en la ruta actual
const breadcrumbs = computed(() => {
  // Aquí puedes construir la lógica para tus breadcrumbs basada en route.path o route.params
  return [
    { text: 'Inicio', to: '/', active: route.path === '/' },
    { text: 'Blogs y contenidos', to: '/blogs', active: route.path === '/blogs' },
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


watch(blog, (newValue) => {
  if (newValue) {
    document.title = `${newValue.title} - CurSeek`; // Actualiza el título de la página
    // Actualiza la descripción de la meta etiqueta
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", extractText(newValue.content, 160));
    }
  }
}, { deep: true, immediate: true });

function extractText(html, length) {
  const div = document.createElement("div");
  div.innerHTML = html;
  const text = div.textContent || div.innerText || "";
  return text.substr(0, length);
}

  </script>

  <style scoped>
  .custom-content h1 {
    color: #2b6cb0; /* un color azul, por ejemplo */
    text-align: center;
  }
</style>
  