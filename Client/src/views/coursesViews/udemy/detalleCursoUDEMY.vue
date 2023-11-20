<template>
  <div class="bg-gray-100 p-4 md:p-6 max-w-screen-full">
    <h1 class="text-center pb-6 text-sm text-gray-500">CurSeek cuenta con el apoyo del alumno. Cuando compra a través de enlaces en nuestro sitio, podemos ganar una comisión de afiliado.</h1>
    <!-- Grilla Principal -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-screen-xl mx-auto">
      <!-- Columna 1 y 2 (Contenido principal) -->
      <div class="md:col-span-2">
        <!-- Sección de Título y Precio -->
        <div class="bg-white p-4 md:p-6 rounded mb-4 justify-between items-center border border-gray-200">
          <h2 class="md:text-3xl font-bold text-gray-800">{{ udemyCourse.title }}</h2>
          <!-- <h2 class="md:text-xl font-semibold text-green-500 py-1" v-if="!udemyCourse.is_paid">$ {{ udemyCourse.price }}</h2> -->
        </div>
        
        <!-- Sección de Descripción Larga -->
        <div class="bg-white p-4 md:p-6 rounded mb-4 border border-gray-200">
          <div v-html="udemyCourse.description" class="700 md:text-md bold-4"></div>
        </div>

        <!-- Sección de Contenido del Curso -->
        <div class="bg-white p-4 md:p-6 rounded mb-4 border border-gray-200">
          <h3 class="md:text-lg font-bold text-gray-800 mb-2">Contenido del Curso</h3>
          <!-- Itera y muestra el contenido aquí -->
        </div>

        <!-- Sección de Valoraciones -->
        <div class="bg-white p-4 md:p-6 rounded mb-4 border border-gray-200">
          <h3 class="md:text-lg font-bold text-gray-800 mb-2">Valoraciones</h3>
          <div v-for="review in udemyCourse.reviews" :key="review._id" class="border-b border-gray-300 mb-4 pb-4">
            <div class="flex items-center mb-1">
              <!-- Componente de estrellas aquí -->
              <rating-component :rating="review.rating"></rating-component>
              <span class="text-gray-600 text-sm ml-2">({{ review.rating }})</span>
            </div>
            <p class="text-gray-800 font-semibold">{{ review.title }}</p>
            <p class="text-gray-600">{{ review.content }}</p>
          </div>
        </div>

        <!-- Sección de Categorías -->
        <div class="bg-white p-4 md:p-6 rounded border border-gray-200">
          <h3 class="md:text-lg font-bold text-gray-800 mb-2">Categorías</h3>
          <div class="text-sm md:text-base font-medium text-gray-900">{{ udemyCourse.primary_category }}</div>
        </div>

        <!-- Nueva Sección de Profesor -->
        <div class="bg-white p-4 md:p-6 rounded border border-gray-200">
          <h3 class="md:text-lg font-bold text-gray-800 mb-2">Profesor</h3>
          <div class="flex text-sm text-black p-2 border-b border-gray-100">
            <div class="flex items-center">
              <img :src="udemyCourse.instructorImage" alt="Imagen del Profesor" class="rounded-full w-6 mr-2">
              <span>{{ udemyCourse.instructors[0]?.name || 'Nombre del Profesor' }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Columna 3 (Barra Lateral con Imagen y Botón) -->
      <div class="bg-white p-4 md:p-6 rounded border border-gray-200">
        <img :src="udemyCourse.image" alt="Imagen del Curso" class="rounded-sm mb-4 w-full">
        <a :href="`https://www.udemy.com${udemyCourse.url}`" target="_blank"
           class="flex bg-indigo-600 text-white text-center py-2 px-4 rounded hover:bg-indigo-800 transition-colors duration-300 ease-in-out w-full items-center text-md justify-center font-semibold">
           Ir al curso
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" class="ml-2">
               <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" fill="#fff" />
           </svg>
          </a>
          
          <div class="px-2 py-6 text-md">
            <ul>
              <!-- Categoría -->
              <li class="flex text-sm text-black p-2 border-b border-gray-100">
                <div class="flex items-center">
                  <svg class="mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" style="min-width: 24px;">
                    <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
                  </svg>
                  <span>{{ udemyCourse.category || 'Categoría' }}</span>
                </div>
              </li>
              <!-- Profesor -->
              <li class="flex text-sm text-black p-2 border-b border-gray-100">
                <div v-if="udemyCourse.instructorImage || (udemyCourse.instructors && udemyCourse.instructors.length > 0)">
                  <div class="flex items-center">
                    <img :src="udemyCourse.instructorImage || udemyCourse.instructors[0]?.image_100x100 || 'ruta_por_defecto_del_profesor.jpg'" alt="Imagen del Profesor" class="rounded-full w-6 mr-2">
                    <span>{{ udemyCourse.instructors[0]?.name || 'Nombre del Profesor' }}</span>
                  </div>
                </div>
              </li>
              <!-- Precio -->
              <li class="flex text-sm text-black p-3">
                <svg class="mr-2" fill="#057500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                  <path d="M570-104q-23 23-57 23t-57-23L104-456q-11-11-17.5-26T80-514v-286q0-33 23.5-56.5T160-880h286q17 0 32 6.5t26 17.5l352 353q23 23 23 56.5T856-390L570-104Zm-57-56 286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640ZM160-800Z"/>
                </svg>
                <h2 class="text-sm" v-if="!udemyCourse.is_paid">$ {{ udemyCourse.price }}</h2>
              </li>
            </ul>
          </div>
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
  description: '',
  instructors: [],
  rating: '',
  students: '',
  image: '',
  url: '',
  reviews: [],
  primary_category: '',
  secondary_category: '',
  instructorImage: '',
  category: '',
});

const route = useRoute();

async function fetchUdemyCourse(courseId) {
  try {
    const response = await axios.get(`http://localhost:3333/cursos/udemy/${courseId}`);
    udemyCourse.value = { ...udemyCourse.value, ...response.data };
    udemyCourse.value.image = udemyCourse.value.image_480x270;
  } catch (error) {
    console.error("Error obteniendo el detalle del curso de Udemy:", error);
  }
}

onMounted(() => {
  console.log('Curso ID:', route.params.id);
  udemyCourse.value.instructorImage = route.params.instructorImage || '';
  udemyCourse.value.category = route.params.category || '';
  fetchUdemyCourse(route.params.id);
});
</script>
