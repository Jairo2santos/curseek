<!-- blogDetails.vue -->
<template>
    <div class="bg-pastel-fucsia min-h-screen p-5">
      <!-- Verifica si el blog ha sido cargado -->
      <div v-if="blog" class="max-w-4xl mx-auto">
        <!-- Tarjeta del Blog para la vista detallada -->
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- Imagen del Blog -->
          <img :src="blog.image" alt="Imagen del Blog" class="w-full h-72 object-cover">
          <!-- Contenido del Blog -->
          <div class="p-5">
            <h1 class="text-4xl font-bold text-pastel-verde mb-4">{{ blog.title }}</h1>
            <!-- Utiliza v-html para renderizar el contenido HTML del blog -->
            <div class="text-gray-700 whitespace-pre-line text-lg" v-html="blog.content"></div>
            <div class="text-pastel-verde text-sm mt-6">
              Publicado el {{ new Date(blog.date).toLocaleDateString() }}
            </div>
          </div>
        </div>
      </div>
      <!-- Mensaje mientras se carga el blog o si no hay datos -->
      <div v-else class="text-center">
        <p>Cargando detalles del blog o blog no encontrado...</p>
      </div>
    </div>
</template>
  
  <script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
const blog = ref(null);
  
onMounted(async () => {
  try {
    const slug = route.params.slug; // Asegúrate de obtener el slug de los parámetros de la ruta
    const response = await axios.get(`http://localhost:3333/api/blogs/slug/${slug}`);
    blog.value = response.data;
  } catch (error) {
    console.error('Error al cargar el blog:', error);
  }
});
  </script>
  