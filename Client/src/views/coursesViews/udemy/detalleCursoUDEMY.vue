<template>
    <div class="bg-gray-100 p-4 md:p-6 max-w-screen-xl mx-auto">
      <!-- Grilla Principal -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <!-- Columna 1 y 2 (Contenido principal) -->
        <div class="md:col-span-2">
          <!-- Sección de Título y Precio -->
          <div class="bg-white p-4 md:p-6 rounded shadow-lg mb-4 flex justify-between items-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ udemyCourse.title }}</h1>
            <h2 class="text-3xl md:text-4xl font-bold text-green-500" v-if="!udemyCourse.is_paid">{{ udemyCourse.price }}</h2>
          </div>
          
          <!-- Sección de Descripción -->
          <div class="bg-white p-4 md:p-6 rounded shadow-lg mb-4">
            <p class="text-gray-700 text-lg md:text-xl mb-4">{{ udemyCourse.headline }}</p>
          </div>
  
          <!-- Sección de Detalles del Instructor -->
          <div class="bg-white p-4 md:p-6 rounded shadow-lg">
            <div v-if="udemyCourse.instructors && udemyCourse.instructors.length">
              <h3 class="text-lg md:text-xl font-semibold text-gray-800 mb-2">Instructores</h3>
              <div v-for="instructor in udemyCourse.instructors" :key="instructor._id" class="flex items-center mb-4">
                <img :src="instructor.image_100x100" alt="Foto del Instructor" class="rounded-full mr-4">
                <div>
                  <div class="text-sm md:text-base font-medium text-gray-900">{{ instructor.display_name }}</div>
                  <div class="text-xs md:text-sm text-gray-600">{{ instructor.job_title }}</div>
                </div>
              </div>
            </div>
            <p class="text-gray-800 font-semibold">{{ review.title }}</p>
            <p class="text-gray-600">{{ review.content }}</p>
          </div>
        </div>
  
        <!-- Columna 3 (Barra Lateral con Imagen y Botón) -->
        <div class="bg-white p-4 md:p-6 rounded shadow-lg">
          <img :src="udemyCourse.image_480x270" alt="Imagen del Curso" class="rounded mb-4">
          <a :href="`https://www.udemy.com${udemyCourse.url}`" target="_blank"
             class="block bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-300 ease-in-out w-full">Ir al curso</a>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const udemyCourse = ref({
    title: '',
    price: '',
    description: '', // Asegúrate de que la API proporciona esta propiedad
    instructors: [],
    rating: '', // Asegúrate de que la API proporciona esta propiedad
    students: '', // Asegúrate de que la API proporciona esta propiedad
    image: '', // Elige la propiedad correcta para la imagen
    url: '',
    reviews: [], // Asegúrate de que la API proporciona esta propiedad
  primary_category: '', // Asegúrate de que la API proporciona esta propiedad
  secondary_category: '' // Asegúrate de que la API proporciona esta propiedad
  });
  
  const route = useRoute(); // obtiene acceso al objeto de ruta actual
  
  // una función asíncrona que carga los datos del curso
  async function fetchUdemyCourse(courseId) {
    try {
      const response = await axios.get(`http://localhost:3333/cursos/udemy/${courseId}`);
      udemyCourse.value = { ...udemyCourse.value, ...response.data }; // mezcla las propiedades por defecto con las de la respuesta
      // Ajusta las URLs de las imágenes si es necesario
      udemyCourse.value.image = udemyCourse.value.image_480x270;
    } catch (error) {
      console.error("Error obteniendo el detalle del curso de Udemy:", error);
    }
  }
  
  // ejecuta la función fetchUdemyCourse cuando el componente se monta
  onMounted(() => {
    console.log('Curso ID:', route.params.id); 
    fetchUdemyCourse(route.params.id);
  });
  </script>
  