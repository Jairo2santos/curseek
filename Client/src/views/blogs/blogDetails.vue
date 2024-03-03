<template>
  <div class="bg-pastel-fucsia min-h-screen p-4">
    <!-- Verifica si el blog ha sido cargado -->
    <div v-if="blog" class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-4 pb-4">
      <h1 class="text-4xl font-bold text-center pt-6 pb-4">{{ blog.title }}</h1>
      <!-- Imagen del Blog -->
      <img :src="blog.image" alt="" class="block mx-auto rounded-sm mb-4 w-full">

      <!-- Contenido del Blog -->
      <div class="md:col-span-1">
        <!-- Utiliza v-html para renderizar el contenido HTML del blog -->
        <div class="text-gray-700 whitespace-pre-line text-lg px-4" v-html="blog.content"></div>
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
  