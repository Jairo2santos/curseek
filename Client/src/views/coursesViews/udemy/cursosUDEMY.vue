<template>
  <div class="bg-white">
    <Portada :title="pageTitle" :description="pageDescription" :totalCourses="totalCourses" :imageSrc="logoUdemy"
    :instagramLink="'https://www.instagram.com/udemy/'"
    :twitterLink="'https://twitter.com/udemy'"
    :facebookLink="'https://www.facebook.com/udemy'" />
    <div class="flex flex-col max-w-screen-full md:flex-row mx-auto pt-6 md:px-40 bg-gray-100 p-4">
      <!-- Sidebar a la izquierda -->
      <div class="mb-4 md:mb-0 w-full md:w-auto mt-4">
        <Sidebar :categories="categories" @filter-by-category="handleCategoryFilter" />
      </div>
      <!-- Contenido a la derecha del Sidebar -->
      <div class="flex flex-col w-full md:ml-6 md:mt-7">
        <!-- Filtros arriba -->
        <div class="mb-4">
          <!-- <Filtros @filter-changed="handleFilterChange" /> -->
        </div>
        <!-- loader -->
        <div v-if="isLoading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
        <div v-else class="transition-opacity duration-500"
          :class="{ 'opacity-0': isLoading, 'opacity-100': !isLoading }">
          <!-- Contenedor de Tarjetas de Cursos al lado del Sidebar -->
          <div class="w-full md:w-1/1">
            <div v-for="course in courses" :key="course.slug" class="mb-5">
              
              <!-- Tarjeta individual para cada curso -->
              <div @click="navigateToCourse(course.slug)" 
                class="block max-w-full bg-white mt-2 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
                <div class="flex flex-col md:flex-row items-start md:items-start">
                  
                  <div class="flex flex-col">
                    <div class="flex flex-col items-start">
                      <!-- Sección 1: Imagen y Título -->
                      <div class="flex flex-col mb-2 items-center md:flex-row">
                        <!-- Imagen del curso -->
                        <img :src="course.image_480x270" alt=""
                          class="md:w-1/5 rounded mb-2 md:mb-0 md:mr-2">
                        <!-- Título del curso -->
                        <h2 class="text-lg mt-2 md:mt-0 font-semibold hover:underline">
                          {{ course.title || 'Aprende con este Curso de Udemy' }}
                        </h2>
                      </div>

                      <!-- Sección 2: Descripción -->
                      <div class="mb-2 md:mb-2">
                        <!-- Descripción del curso -->
                        <p class="text-sm text-gray-700 mr-2">
                          {{ course.headline || 'En el ámbito actual, al guiar a individuos, equipos y organizaciones a través de procesos de desarrollo del talento humano, se...' }}
                        </p>
                      </div>
                      <!-- Sección 3: Botones (usando el componente Favoritos) -->
                      <div class="bg-gray-200 md:bg-white items-end ml-auto rounded-lg md:m-0">
                        <button class="mx-3" title="Agregar a Favoritos">
                          <Favoritos :courseId="course._id" :courseType="'UDEMY'" :isFavorited="course.isFavorited" />
                        </button>
                      </div>
                        <!-- <a href="/cursos/udemy">
                          <button class="rounded-full border border-gray-300 hover:border-gray-500 transition pr-2">
                            <div class="flex">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="22">
                                <path d="M460-300h40v-160h160v-40H500v-160h-40v160H300v40h160v160Zm20.134 180q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120ZM480-160q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                              </svg>
                              <p class="text-sm">Agregar</p>
                            </div>
                          </button>
                        </a> -->
                    </div>
                  </div>

                  <!-- Sección derecha con categoría, precio y cursada -->
                  <div class="md:w-1/4 md:ml-auto md:flex md:flex-col md:items-end text-left px-4 md:border-l md:border-gray-100">
                    <ul>
                      <!-- Institución -->
                      <li class="flex text-sm text-gray-800 p-2 md:border-b md:border-gray-100">
                        <div class="flex items-center">
                          <a href="/cursos/udemy">
                            <button class="flex hover:underline transition" title="Ir a cursos de Udemy">
                              <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                                width="24">
                                <path
                                  d="M400-420h139.231v-40H400v40Zm0-120h278.462v-40H400v40Zm0-120h278.462v-40H400v40Zm-75.385 380Q297-280 278.5-298.5 260-317 260-344.615v-430.77Q260-803 278.5-821.5 297-840 324.615-840h430.77Q783-840 801.5-821.5 820-803 820-775.385v430.77Q820-317 801.5-298.5 783-280 755.385-280h-430.77Zm0-40h430.77q9.231 0 16.923-7.692Q780-335.385 780-344.615v-430.77q0-9.23-7.692-16.923Q764.616-800 755.385-800h-430.77q-9.23 0-16.923 7.692Q300-784.615 300-775.385v430.77q0 9.23 7.692 16.923Q315.385-320 324.615-320Zm-120 160Q177-160 158.5-178.5 140-197 140-224.615v-470.77h40v470.77q0 9.231 7.692 16.923Q195.384-200 204.615-200h470.77v40h-470.77ZM300-800v480-480Z" />
                              </svg>
                              <span>Udemy</span>
                            </button>
                          </a>
                        </div>
                      </li>
                      <!-- Categoría -->
                      <li class="flex text-sm text-gray-800 p-2 md:border-b md:border-gray-100">
                        <div class="flex items-center">
                          <svg class="mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24"
                            viewBox="0 -960 960 960" width="24">
                            <path
                              d="M260-318.462q52.385 0 101.885 12.039 49.5 12.038 98.115 39.192v-392.461q-43.308-30.923-95.462-46.385Q312.385-721.538 260-721.538q-36 0-63.039 4.307-27.038 4.308-60.038 16-9.231 3.077-13.077 8.846-3.846 5.77-3.846 12.693v360.615q0 10.769 7.692 15.769 7.693 5 16.923 1.154 21.923-7.384 50.654-11.846Q224-318.462 260-318.462Zm240 51.231q48.615-27.154 98.115-39.192 49.5-12.039 101.885-12.039 36 0 64.731 4.462 28.731 4.462 50.654 11.846 9.23 3.846 16.923-1.154 7.692-5 7.692-15.769v-360.615q0-6.923-3.846-12.308t-13.077-9.231q-33-11.692-60.038-16Q736-721.538 700-721.538q-52.385 0-104.538 15.461-52.154 15.462-95.462 46.385v392.461Zm-20 58.001q-48.769-33.385-104.769-51.308-56-17.923-115.231-17.923-31.231 0-61.346 5.231Q168.538-268 140-256.461q-21.769 8.692-40.885-5.231Q80-275.615 80-300.153v-386.616q0-14.847 7.807-27.539Q95.615-727 109.692-732q35.231-15.539 73.308-22.539 38.077-7 77-7 58.769 0 114.654 16.923Q430.538-727.693 480-695.385q49.462-32.308 105.346-49.231Q641.231-761.539 700-761.539q38.923 0 77 7T850.308-732q14.077 5 21.885 17.692Q880-701.616 880-686.769v386.616q0 24.538-20.654 37.692-20.653 13.154-43.961 4.461-27.769-10.769-56.731-15.615-28.962-4.846-58.654-4.846-59.231 0-115.231 17.923-56 17.923-104.769 51.308ZM290-499.385Z" />
                          </svg>
                          <span style="min-width: 120px;">{{ course.primary_category?.title || 'Development' }}</span>
                        </div>
                      </li>
                      <!-- Duración -->
                      <li class="flex text-sm text-gray-800 p-2 md:border-b md:border-gray-100">
                        <div class="flex items-center">
                          <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960"
                            width="24">
                            <path
                              d="m625.846-305.846 28.308-28.308L500-488.326V-680h-40v208.308l165.846 165.846ZM480.134-120q-74.673 0-140.41-28.339-65.737-28.34-114.365-76.922-48.627-48.582-76.993-114.257Q120-405.194 120-479.866q0-74.673 28.339-140.41 28.34-65.737 76.922-114.365 48.582-48.627 114.257-76.993Q405.194-840 479.866-840q74.673 0 140.41 28.339 65.737 28.34 114.365 76.922 48.627 48.582 76.993 114.257Q840-554.806 840-480.134q0 74.673-28.339 140.41-28.34 65.737-76.922 114.365-48.582 48.627-114.257 76.993Q554.806-120 480.134-120ZM480-480Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z" />
                          </svg>
                          <span>{{ course.duration || '4 semanas' }}</span>
                        </div>
                      </li>
                      <!-- Proferor -->
                      <!-- <li class="flex text-sm text-black p-2 md:border-b md:border-gray-100">
                      <div v-if="course.instructors && course.instructors.length" class="flex items-center">
                        <img :src="course.instructors[0].image_100x100" alt="Instructor" class="rounded-full w-6 mr-2">
                        <span>{{ course.instructors[0].name }}</span>
                      </div>
                    </li> -->
                      <!-- Precio -->
                      <li class="flex text-sm text-gray-800 p-2">
                        <svg class="mr-2" fill="#057500" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M542.308-131.692q-11.529 11.461-28.573 11.461-17.043 0-28.504-11.461l-352-352q-6.385-6.385-9.808-14.02T120-514v-286q0-16.077 11.961-28.039Q143.923-840 160-840h286q7.769 0 15.452 3.166 7.683 3.167 13.317 8.526l352 352.231Q839-463.846 839.385-446.5q.384 17.346-11.077 28.808l-286 286ZM513.425-160l286.344-286-353.425-354H160v286l353.425 354ZM259.91-660q16.629 0 28.359-11.64Q300-683.281 300-699.909q0-16.63-11.64-28.36Q276.72-740 260.09-740q-16.629 0-28.359 11.64Q220-716.719 220-700.091q0 16.63 11.64 28.36Q243.28-660 259.91-660ZM160-800Z"/></svg>

                        <span :class="course.is_paid ? 'text-gray-800' : 'text-gray-800'">
                          {{ displayPrice(course) }}
                        </span>

                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Paginación -->
          <Paginacion :currentPage="currentPage" :totalPages="totalPages" @changePage="handlePageChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted , computed } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import logoUdemy from "../../../assets/logo-udemy.jpg";
import Sidebar from "../../../components/Sidebar.vue";
//import Filtros from "../../../components/Filtros.vue";
import Favoritos from "../../../components/Favoritos.vue";
const router = useRouter();

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Estado
const pageTitle = "Cursos de Udemy";
const pageDescription = "Udemy.com es una plataforma de aprendizaje en línea. Está dirigido a adultos profesionales.​ A diferencia de los programas académicos MOOC conducidos por tradicionales cursos de trabajo creados por las universidades, Udemy utiliza contenido de creadores en línea para vender y así conseguir ganancias.​";
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const categories = ref([]);
const isLoading = ref(false);

const loadCourses = async (page, selectedCategory = '') => {
  let queryParams = `page=${page}`;
  isLoading.value = true;
  if (selectedCategory) {
    queryParams += `&category=${encodeURIComponent(selectedCategory)}`;
  }
  try {
    const { data } = await axios.get(`/cursos/udemy?${queryParams}`);
    courses.value = data.courses;
    totalPages.value = typeof data.totalPages === "number" ? data.totalPages : 1;
    totalCourses.value = data.totalCourses;
  } catch (error) {
    console.error("Error al obtener los cursos de Udemy:", error);
    alert("Error al cargar los cursos");
  } finally {
    isLoading.value = false; 
  }
};
const loadCategories = async () => {
  try {
    const { data } = await axios.get("/categorias/udemy");
    categories.value = data;
  } catch (error) {
    console.error("Error al obtener las categorías de Udemy:", error);
  }
};
const navigateToCourse = (courseSlug) => {
  if (!courseSlug) {
    console.error('No slug provided for navigation');
    return;
  }
  router.push({ name: 'DetalleCursoUdemy', params: { slug: courseSlug } });
};
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses(currentPage.value);
};
const handleCategoryFilter = async (selectedCategory) => {
  console.log('Filtrando por la categoría:', selectedCategory);
  currentPage.value = 1; 
  await loadCourses(currentPage.value, selectedCategory);
};
const displayPrice = (course) => {
  if (!course.is_paid) {
    return 'Gratuito';
  } else {
    return course.price !== 'Free' ? course.price : 'Gratuito';
  }
};

// Montaje
onMounted(() => {
  loadCourses(currentPage.value);
  loadCategories();
  console.log(courses.value);
});

</script>