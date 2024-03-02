<template>
  <div class="bg-gray-100">
    <!-- Portada -->
    <!-- Imagen de Portada -->
    <img :src="portadaImg" alt="" class="w-full h-80 object-cover" />

    <!-- Contenido de la Portada -->
    <div class="text-sm bg-opacity-75 px-4 sm:px-20 lg:px-60">
      <!-- Título y Descripción -->
      <div class="flex flex-col sm:flex-row pb-4 md:pb-0 items-center border-b border-gray-300">
        <!-- Imagen -->
        <img src="../../../../assets/instituciones/UAB.png" alt="Universidad de Barcelona" class="w-64 h-auto">

        <!-- Texto -->
        <div>
          <h1 class="lg:text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
          <p class="text-gray-600">{{ pageDescription }}</p>
        </div>
      </div>

      <!-- Redes Sociales, ajustadas debajo de la imagen y el texto -->
      <div class="flex justify-center space-x-4 py-4">
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

    
    <div class="container mx-auto px-4 sm:px-20 lg:px-60 py-6">
      <!-- Cursos -->
      <h2 class="text-md lg:text-xl font-semibold p-4 text-gray-800">
        Cursos y programas especializados
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
        <div v-for="(course) in displayedCourses" :key="course.slug"
          class="flex flex-col bg- p-2 m-1 rounded-lg h-full hover:shadow-md shadow-sm transition">
          <router-link :to="`/coursera/cursos/${course.slug}`"
            class="inline-block hover:underline text-blue-600">
              <img :src="course.imgUrl" alt="Imagen del curso" class="w-full h-48 object-cover rounded-md mb-4">
              <div class="flex-grow">
                <h3 class="text-md font-semibold">{{ course.title || 'Título' }}</h3>
              </div>
          </router-link>
        </div>
      </div>

      <!-- Paginación -->
      <Paginacion :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />

      <!-- Profesores -->
      <div class="mt-8">
        <h2 class="text-xl font-semibold mb-4">Profesores</h2>
        <div v-if="professors.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="professor in (isProfessorsExpanded ? professors : professors.slice(0, 16))" :key="professor._id"
            class="bg-white p-4 rounded-lg shadow-md flex items-center">
            <img :src="professor.imageUrl" alt="Foto del profesor" class="w-16 h-16 object-cover rounded-full mr-4" />
            <div>
              <h3 class="font-semibold">{{ professor.name }}</h3>
            </div>
          </div>
        </div>
        <div v-if="professors.length > 4" class="text-center mt-4">
          <button @click="toggleProfessorsVisibility"
            class="px-4 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition ease-in duration-300">
            {{ isProfessorsExpanded ? 'Ver Menos' : 'Ver Más' }}
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

import portadaImg from "../../../../assets/instituciones/UAB_campus.png";

const pageTitle = 'Universidad de Barcelona - Coursera';
const pageDescription = 'La Universidad de Barcelona (UB), fundada en 1450, es una de las instituciones educativas más antiguas de España y se ha destacado por su excelencia en la enseñanza e investigación. Ofrece una amplia gama de grados, másteres y programas de doctorado en diversos campos del conocimiento, desde las humanidades hasta las ciencias naturales y la salud. Ubicada en Barcelona, ha sido fundamental en la vida intelectual y cultural de Cataluña y España, contribuyendo al avance del conocimiento y la innovación. Su campus histórico y modernas instalaciones ofrecen un entorno estimulante para estudiantes y académicos de todo el mundo.';
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
    const response = await axios.get('/api/cursos/coursera/universidad/UAB/profesores');
    professors.value = response.data;
  } catch (error) {
    console.error("Error al obtener los profesores:", error.message);
  }
};

// Cargar cursos
const loadCourses = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`/api/cursos/coursera/universidad/UAB?page=${currentPage.value}`);
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