<template>
    <div class="bg-gray-100">
      <!-- SEO -->
      <seo-component
      :title="pageTitleSEO"
      :description="pageDescriptionSEO"
      :breadcrumbs="breadcrumbs"
    />
      <!-- Portada -->
      <!-- Imagen de Portada -->
      <img :src="portadaImg" alt="campus de la universidad catolica de chile" class="w-full h-80 object-cover hidden md:block" />
  
      <!-- Contenido de la Portada -->
      <div class="text-sm bg-opacity-75 px-4 sm:px-20 lg:px-60">
        <!-- Título y Descripción -->
        <div class="flex flex-col sm:flex-row pb-4 md:pb-0 items-center border-b border-gray-300">
          <!-- Imagen -->
          <img src="../../../../assets/instituciones/upchile.png" alt="Pontificia Universidad Católica de Chile" class="w-64 h-auto">
  
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
      <!-- Paginación -->
      <Paginacion
  :currentPage="currentPage"
  :totalPages="totalPages"
  @pageChange="handlePageChange"
/>    
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
import { ref, computed, onMounted, watch } from 'vue';
import axios from '../../../../axiosConfig.js' 
import Paginacion from '../../../../components/Paginacion.vue';
import portadaImg from "../../../../assets/instituciones/UAB_campus.png";
import SeoComponent from '../../../../components/SEO.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const pageTitle = 'Cursos de la Universidad de Barcelona - Curseek';
const pageDescription = 'La Universidad de Barcelona (UB), fundada en 1450, es una de las instituciones educativas más antiguas de España y se ha destacado por su excelencia en la enseñanza e investigación. Ofrece una amplia gama de grados, másteres y programas de doctorado en diversos campos del conocimiento, desde las humanidades hasta las ciencias naturales y la salud. Ubicada en Barcelona, ha sido fundamental en la vida intelectual y cultural de Cataluña y España, contribuyendo al avance del conocimiento y la innovación. Su campus histórico y modernas instalaciones ofrecen un entorno estimulante para estudiantes y académicos de todo el mundo.';
const courses = ref([]);
const professors = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const isLoading = ref(false);
const isProfessorsExpanded = ref(false);
const visibleCourses = ref(8);
const displayedCourses = computed(() => courses.value.slice(0, visibleCourses.value));


  
//SEO

// Ejemplo de pageTitle y pageDescription
const pageTitleSEO = 'Cursos de la Universidad Católica de Chile - CurSeek';
const pageDescriptionSEO = 'Explora cursos de la UPCHILE y amplía tus conocimientos con sus programas especializados.';

// Usa la API de enrutamiento de Vue para obtener la ruta actual

// Crea una estructura de breadcrumbs reactiva basada en la ruta actual
const breadcrumbs = computed(() => {
  // Aquí puedes construir la lógica para tus breadcrumbs basada en route.path o route.params
  return [
    { text: 'Inicio', to: '/', active: route.path === '/' },
    { text: 'Coursera', to: '/cursos/coursera', active: route.path === '/cursos/coursera' },
    { text: 'pontificia universidad católica de chile', to: '/coursera/universidades/upchile', active: route.path === '/coursera/universidades/upchile' },
    // La última ruta es siempre activa y no tiene enlace
  ];
});

  // Redes sociales links
  const instagramLink = 'https://www.instagram.com/ucatolicaoficial/';
  const twitterLink = 'https://twitter.com/ucatolica';
  const facebookLink = 'https://www.facebook.com/ucatolica/';
  
  // Cargar profesores
  const loadProfessors = async () => {
    try {
      const response = await axios.get('/cursos/coursera/universidad/UpChile/profesores');
      professors.value = response.data;
    } catch (error) {
      console.error("Error al obtener los profesores:", error.message);
    }
  };
  
  
  // Cargar cursos
  const loadCourses = async () => {
    isLoading.value = true;
    const page = route.query.page ? parseInt(route.query.page, 10) : 1;

    try {
      const response = await axios.get(`/cursos/coursera/universidad/UpChile?page=${currentPage.value}`);
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
  // Asegúrate de que newPage sea un número antes de actualizar la URL
  const pageNumber = Number(newPage);
  router.push({ query: { ...route.query, page: pageNumber.toString() } });
};
watch(() => route.query.page, (newPage, oldPage) => {
  // Convertir la página nueva en número y luego asignar
  const pageNumber = Number(newPage) || 1;
  if (pageNumber !== currentPage.value) {
    currentPage.value = pageNumber;
    loadCourses();
  }
}, { immediate: true });
  // Toggle para la visibilidad de los profesores
  const toggleProfessorsVisibility = () => {
    isProfessorsExpanded.value = !isProfessorsExpanded.value;
  };
  
  onMounted(() => {
    loadCourses();
    loadProfessors();
  });
  </script>