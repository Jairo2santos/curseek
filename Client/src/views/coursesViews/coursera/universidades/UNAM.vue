<template>
  <div class="bg-gray-100">
    <!-- Portada -->
    <!-- Imagen de Portada -->
    <img :src="portadaImg" alt="" class="w-full h-80 object-cover hidden md:block" />

    <!-- Contenido de la Portada -->
    <div class="text-sm bg-opacity-75 px-4 sm:px-20 lg:px-60">
      <!-- Título y Descripción -->
      <div class="flex flex-col sm:flex-row pb-4 md:pb-0 items-center border-b border-gray-300">
        <!-- Imagen -->
        <img src="../../../../assets/instituciones/UNAM.png" alt="Universidad Autonoma de Mexico logo" class="w-64 h-auto">

        <!-- Texto -->
        <div>
          <h1 class="lg:text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
          <p class="text-gray-600">{{ pageDescription }}</p>
        </div>
      </div>

      <!-- Redes Sociales, ajustadas debajo de la imagen y el texto -->
      <div class="flex justify-center space-x-4 py-4">
        <a :href="instagramLink" target="_blank" class="flex items-center mr-2 text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
          <i class="fab fa-instagram fa-lg w-8 mr-1 ml-4"></i>
        </a>
        <a :href="twitterLink" target="_blank" class="flex items-center mr-2 text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
          <i class="fab fa-twitter fa-lg w-8 mr-1 ml-4"></i>
        </a>
        <a :href="facebookLink" target="_blank" class="flex items-center mr-2 text-sm transition hover:scale-110 font-bold text-indigo-900 rounded-full">
          <i class="fab fa-facebook fa-lg w-8 mr-1 ml-4"></i>
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
            class="mt-4 text-blue-600 hover:underline transition focus:outline-none">
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

import portadaImg from "../../../../assets/instituciones/unam_campus.jpg";

const pageTitle = ' Universidad Nacional Autónoma de México - Coursera';
const pageDescription = 'La Universidad Nacional Autónoma de México (UNAM) es una de las universidades más grandes y prestigiosas de América Latina. Fundada el 22 de septiembre de 1910, tiene su origen en la Real y Pontificia Universidad de México, establecida en 1551 por la Corona Española. Es una institución pública y autónoma que ofrece una amplia gama de programas académicos en todos los niveles de educación superior, incluyendo pregrado, posgrado y educación continua. La UNAM se destaca por su excelencia académica, su intensa actividad de investigación y su contribución significativa al desarrollo cultural, científico y tecnológico de México. Cuenta con múltiples facultades, escuelas, institutos y centros de investigación que abarcan áreas del conocimiento como las ciencias sociales, las humanidades, las ciencias exactas, las ingenierías, las artes, y más.';
const courses = ref([]);
const professors = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const isLoading = ref(false);
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const isProfessorsExpanded = ref(false);

// Redes sociales links
const instagramLink = 'https://www.instagram.com/unam_mx/';
const twitterLink = 'https://twitter.com/UNAM_MX';
const facebookLink = 'https://www.facebook.com/UNAM.MX.Oficial/';

// Cargar profesores
const loadProfessors = async () => {
  try {
    const response = await axios.get('/cursos/coursera/universidad/UNAM/profesores');
    professors.value = response.data;
  } catch (error) {
    console.error("Error al obtener los profesores:", error.message);
  }
};

// Cargar cursos
const loadCourses = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`/cursos/coursera/universidad/UNAM?page=${currentPage.value}`);
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