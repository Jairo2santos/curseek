<template>
  <div class="bg-white">
    <Portada
      :title="pageTitle"
      :description="pageDescription"
      :totalCourses="totalCourses"
      :imageSrc="logoUdemy"
    />

  <div class="flex flex-col max-w-screen-full md:flex-row mx-auto pt-6 md:px-40 bg-gray-100 p-4">
  <!-- Sidebar a la izquierda -->
  <div class="mb-4 md:mb-0 w-full md:w-auto mt-4">
    <Sidebar :categories="categories" @filter-by-category="handleCategoryFilter" />
  </div>

  <!-- Contenido a la derecha del Sidebar -->
  <div class="flex flex-col w-full md:ml-6">
    <!-- Filtros arriba -->
    <div class="mb-4">
      
    </div>

    <!-- Contenedor de Tarjetas de Cursos al lado del Sidebar -->
    <div class="w-full md:w-1/1">
      <div v-for="course in courses" :key="course.id" class="mb-5">
        <!-- Tarjeta individual para cada curso -->
        <div @click="navigateToCourse(course._id)" class="block max-w-full bg-white mt-2 rounded-lg p-4 hover:shadow-lg transition">

            
              <div class="flex flex-col md:flex-row items-start md:items-start">
                <!-- Imagen del curso -->
                <img
                  :src="course.image_480x270"
                  alt="Imagen del curso"
                  class="md:w-1/6 rounded mb-4 md:mb-0 md:mr-4"
                >

                <!-- Contenido del curso -->
                <div class="ml-0 flex-grow">
                  <!-- Título del curso -->
                  <h2 class="md:text-lg font-semibold mb-2 hover:underline mr-6">
                    {{ course.title }}
                  </h2>
                  
                  <!-- Descripción del curso -->
                  <p class="text-sm text-gray-600 mr-20">
                    {{ course.headline }}
                  </p>

                </div>

                <!-- Sección derecha con categoría, precio y cursada -->
                <div class="md:w-1/4 md:flex md:flex-col md:items-end text-left p-2 border-l border-gray-100">
                  <ul>
                    <!-- Categoría -->
                    <li class="flex text-sm text-black p-2 border-b border-gray-100">
                      <div class="flex items-center">
                        <svg class="mr-2" fill="#6366f1" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M260-318.462q52.385 0 101.885 12.039 49.5 12.038 98.115 39.192v-392.461q-43.308-30.923-95.462-46.385Q312.385-721.538 260-721.538q-36 0-63.039 4.307-27.038 4.308-60.038 16-9.231 3.077-13.077 8.846-3.846 5.77-3.846 12.693v360.615q0 10.769 7.692 15.769 7.693 5 16.923 1.154 21.923-7.384 50.654-11.846Q224-318.462 260-318.462Zm240 51.231q48.615-27.154 98.115-39.192 49.5-12.039 101.885-12.039 36 0 64.731 4.462 28.731 4.462 50.654 11.846 9.23 3.846 16.923-1.154 7.692-5 7.692-15.769v-360.615q0-6.923-3.846-12.308t-13.077-9.231q-33-11.692-60.038-16Q736-721.538 700-721.538q-52.385 0-104.538 15.461-52.154 15.462-95.462 46.385v392.461Zm-20 58.001q-48.769-33.385-104.769-51.308-56-17.923-115.231-17.923-31.231 0-61.346 5.231Q168.538-268 140-256.461q-21.769 8.692-40.885-5.231Q80-275.615 80-300.153v-386.616q0-14.847 7.807-27.539Q95.615-727 109.692-732q35.231-15.539 73.308-22.539 38.077-7 77-7 58.769 0 114.654 16.923Q430.538-727.693 480-695.385q49.462-32.308 105.346-49.231Q641.231-761.539 700-761.539q38.923 0 77 7T850.308-732q14.077 5 21.885 17.692Q880-701.616 880-686.769v386.616q0 24.538-20.654 37.692-20.653 13.154-43.961 4.461-27.769-10.769-56.731-15.615-28.962-4.846-58.654-4.846-59.231 0-115.231 17.923-56 17.923-104.769 51.308ZM290-499.385Z"/>
                        </svg>
                        <span style="min-width: 120px;">{{ course.primary_category?.title || 'Categoría' }}</span>
                      </div>
                    </li>
                    <!-- Institución -->
                    <li class="flex text-sm text-black p-2 border-b border-gray-100">
                      <div class="flex items-center">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="M400-420h139.231v-40H400v40Zm0-120h278.462v-40H400v40Zm0-120h278.462v-40H400v40Zm-75.385 380Q297-280 278.5-298.5 260-317 260-344.615v-430.77Q260-803 278.5-821.5 297-840 324.615-840h430.77Q783-840 801.5-821.5 820-803 820-775.385v430.77Q820-317 801.5-298.5 783-280 755.385-280h-430.77Zm0-40h430.77q9.231 0 16.923-7.692Q780-335.385 780-344.615v-430.77q0-9.23-7.692-16.923Q764.616-800 755.385-800h-430.77q-9.23 0-16.923 7.692Q300-784.615 300-775.385v430.77q0 9.23 7.692 16.923Q315.385-320 324.615-320Zm-120 160Q177-160 158.5-178.5 140-197 140-224.615v-470.77h40v470.77q0 9.231 7.692 16.923Q195.384-200 204.615-200h470.77v40h-470.77ZM300-800v480-480Z"/>
                        </svg>
                        <!-- Usa el filtro capitalize -->
                        <span style="min-width: 120px; text-transform: capitalize;">Udemy</span>
                      </div>
                    </li>
                    <!-- Proferor -->
                    <li class="flex text-sm text-black p-2 border-b border-gray-100">                  
                      <div v-if="course.instructors && course.instructors.length" class="flex items-center">
                        <img :src="course.instructors[0].image_100x100" alt="Instructor" class="rounded-full w-6 mr-2">
                        <span>{{ course.instructors[0].name }}</span>
                      </div>
                    </li>
                    <!-- Precio -->
                    <li class="flex text-sm text-black p-2">
                      <svg class="mr-2" fill="#057500" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M542.308-131.692q-11.529 11.461-28.573 11.461-17.043 0-28.504-11.461l-352-352q-6.385-6.385-9.808-14.02T120-514v-286q0-16.077 11.961-28.039Q143.923-840 160-840h286q7.769 0 15.452 3.166 7.683 3.167 13.317 8.526l352 352.231Q839-463.846 839.385-446.5q.384 17.346-11.077 28.808l-286 286ZM259.91-660q16.629 0 28.359-11.64Q300-683.281 300-699.909q0-16.63-11.64-28.36Q276.72-740 260.09-740q-16.629 0-28.359 11.64Q220-716.719 220-700.091q0 16.63 11.64 28.36Q243.28-660 259.91-660Z"/>
                      </svg>
                      <span :class="course.is_free ? 'text-gray-500' : 'text-green-700'">
                        $ {{ course.is_free ? 'Gratis' : course.price }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <Favoritos :courseId="course._id" :courseType="'UDEMY'" :isFavorited="course.isFavorited" class="mt-8"/>

            </div>


          </div>
        </div>
        <!-- Paginación -->
        <Paginacion
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="handlePageChange"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import logoUdemy from "../../../assets/logo-udemy.jpg";
import Sidebar from "../../../components/Sidebar.vue";
import Filtros from "../../../components/Filtros.vue";
import Favoritos from "../../../components/Favoritos.vue";
const router = useRouter();

axios.defaults.baseURL = "http://localhost:3333";


// Estado
const pageTitle = "Cursos de Udemy";
const pageDescription = "Udemy.com es una plataforma de aprendizaje en línea. Está dirigido a adultos profesionales.​ A diferencia de los programas académicos MOOC conducidos por tradicionales cursos de trabajo creados por las universidades, Udemy utiliza contenido de creadores en línea para vender y así conseguir ganancias.​";

const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const categories = ref([]);



const loadCourses = async (page, selectedCategory = '') => {
  let queryParams = `page=${page}`;

  if (selectedCategory) {
    queryParams += `&category=${encodeURIComponent(selectedCategory)}`;
  }

  try {
    const { data } = await axios.get(`cursos/udemy?${queryParams}`);
    courses.value = data.courses;
    totalPages.value = typeof data.totalPages === "number" ? data.totalPages : 1;
    totalCourses.value = data.totalCourses;
  } catch (error) {
    console.error("Error al obtener los cursos de Udemy:", error);
    alert("Error al cargar los cursos");
  }
};


const loadCategories = async () => {
  try {
    const { data } = await axios.get("categorias/udemy");
    categories.value = data;
  } catch (error) {
    console.error("Error al obtener las categorías de Udemy:", error);
  }
};

const navigateToCourse = (courseId) => {
  // Esta función navega a la página de detalles del curso cuando se hace clic en el contenido de la tarjeta
  router.push({ name: 'DetalleCursoUdemy', params: { id: courseId } });
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses(currentPage.value);
};
const handleCategoryFilter = async (selectedCategory) => {
  // Asegúrate de que estamos enviando la categoría correcta al backend
  console.log('Filtrando por la categoría:', selectedCategory);
  currentPage.value = 1; // Reinicia la paginación al filtrar por categoría
  await loadCourses(currentPage.value, selectedCategory);
};

// Montaje
onMounted(() => {
  loadCourses(currentPage.value);
  loadCategories();
});
console.log(courses.value);
</script>
