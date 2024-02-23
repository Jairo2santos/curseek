<template>
  <div class="bg-gray-100">
    <!-- Portada -->
    <div class="bg-blue-500">
      <!-- Imagen de Portada -->
      <img :src="portadaImg" alt="Imagen de portada" class="w-full h-80 object-cover" />

      <!-- Contenido de la Portada -->
      <div class="bg-white bg-opacity-75 text-center py-4">
        <!-- Título y Descripción -->
        <h1 class="lg:text-2xl  font-semibold text-gray-800">{{ pageTitle }}</h1>
        <p class="text-gray-600">{{ pageDescription }}</p>
        
        <!-- Redes Sociales, ajustadas debajo del texto -->
        <div class="flex justify-center space-x-4 mt-4">
          <a :href="instagramLink" target="_blank" class="text-gray-600 hover:text-gray-800">
            <i class="fab fa-instagram fa-lg"></i>
          </a>
          <a :href="twitterLink" target="_blank" class="text-gray-600 hover:text-gray-800">
            <i class="fab fa-twitter fa-lg"></i>
          </a>
          <a :href="facebookLink" target="_blank" class="text-gray-600 hover:text-gray-800">
            <i class="fab fa-facebook-f fa-lg"></i>
          </a>
        </div>
      </div>
    </div>
 <!-- Cursos -->
 <h2 class="text-3xl lg:text-2xl font-bold text-gray-800 my-6 text-center">
  Cursos ofrecidos por la Universidad de Barcelona
</h2>
 <div class="container mx-auto px-4 py-6">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <div v-for="(course, index) in displayedCourses" :key="course.slug" class="flex flex-col bg-white p-4 rounded-lg shadow-md h-full">
      <img :src="course.imgUrl" alt="Imagen del curso" class="w-full h-48 object-cover rounded-lg mb-4">
      <div class="flex-grow">
        <h3 class="text-lg font-semibold truncate">{{ course.title }}</h3>
        <p class="my-2">
          {{ course.shortDescription !== "No short description found" ? course.shortDescription : course.longDescription.substring(0, 100) + "..." }}
        </p>
      </div>
      <div class="mt-auto text-right">
        <router-link :to="`/coursera/cursos/${course.slug}`" class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg">Ver detalles</router-link>
      </div>
    </div>
  </div>

      <!-- Paginación -->
      <Paginacion :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />

      <!-- Profesores -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Profesores</h2>
        <div v-if="professors.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="professor in (isProfessorsExpanded ? professors : professors.slice(0, 16))" :key="professor._id" class="bg-white p-4 rounded-lg shadow-md flex items-center">
            <img :src="professor.imageUrl" alt="Foto del profesor" class="w-16 h-16 object-cover rounded-full mr-4" />
            <div>
              <h3 class="font-semibold">{{ professor.name }}</h3>
            </div>
          </div>
        </div>
        <div v-if="professors.length > 4" class="text-center mt-4">
          <button @click="toggleProfessorsVisibility" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {{ isProfessorsExpanded ? 'Ver menos' : 'Ver más profesores' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import Paginacion from '../../../../components/Paginacion.vue';

import portadaImg from "../../../../assets/instituciones/AUB.png";

const pageTitle = 'Universidad de Barcelona - Cursos Coursera';
const pageDescription = 'La Universidad de Barcelona (UB), fundada en 1450, es una de las instituciones educativas más antiguas de España. Con una rica tradición académica y cultural, se ha consolidado como un centro de excelencia en la enseñanza y la investigación. Destacada por su amplia oferta de grados, másteres y programas de doctorado, la UB abarca una vasta gama de campos del conocimiento, desde las humanidades y ciencias sociales hasta las ciencias naturales y la salud. Situada en el corazón de Barcelona, esta universidad ha jugado un papel crucial en la vida intelectual y cultural de Cataluña y España, contribuyendo significativamente al avance del conocimiento y la innovación. Su campus histórico, junto con instalaciones modernas, ofrece un entorno estimulante para estudiantes y académicos de todo el mundo.';
const courses = ref([]);
const professors = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const isLoading = ref(false);
axios.defaults.baseURL = "http://localhost:3333";
const isProfessorsExpanded = ref(false);

// Redes sociales links
const instagramLink = 'https://www.instagram.com/exploreuab/';
const twitterLink = 'https://twitter.com/UABBarcelona';
const facebookLink = 'https://www.facebook.com/uabbarcelona/';

// Cargar profesores
const loadProfessors = async () => {
  try {
    const response = await axios.get('/cursos/coursera/universidad/UAB/profesores');
    professors.value = response.data;
  } catch (error) {
    console.error("Error al obtener los profesores:", error.message);
  }
};

// Cargar cursos
const loadCourses = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`/cursos/coursera/universidad/UAB?page=${currentPage.value}`);
    courses.value = response.data.courses;
    totalPages.value = response.data.totalPages;
    totalCourses.value = response.data.totalCourses;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
  } finally {
    isLoading.value = false;
  }
};

// Manejo del cambio de página
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses();
};

// Mostrar una cantidad limitada de cursos
const visibleCourses = ref(8);
const displayedCourses = computed(() => courses.value.slice(0, visibleCourses.value));

// Toggle para la visibilidad de los profesores
const toggleProfessorsVisibility = () => {
  isProfessorsExpanded.value = !isProfessorsExpanded.value;
};

onMounted(() => {
  loadCourses();
  loadProfessors();
});
</script>