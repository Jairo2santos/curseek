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
      <Filtros @filter-changed="handleFilterChange" />
    </div>

    <!-- Contenedor de Tarjetas de Cursos al lado del Sidebar -->
    <div class="w-full md:w-1/1">
      <div v-for="course in courses" :key="course.id" class="mb-5">
        <!-- Tarjeta individual para cada curso -->
            <router-link :to="{ name: 'DetalleCursoUdemy', params: { id: course._id } }"
            class="block max-w-full bg-white mt-2 rounded-lg p-4 hover:shadow-lg transition">

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
                  <h2 class="md:text-md font-semibold mb-2 hover:underline mr-12">
                    {{ course.title }}
                  </h2>
                  <!-- Descripción del curso -->
                  <p class="text-sm text-gray-600 mr-20">
                    {{ course.headline }}
                  </p>
                </div>

                <!-- Sección derecha con categoría, precio y cursada -->
                <div class="md:w-1/4 md:flex md:flex-col md:items-end text-left p-4 border-l border-gray-100">
                  <ul>
                    <!-- Categoría -->
                    <li class="flex text-sm text-black p-2 border-b border-gray-100">
                      <div class="flex items-center">
                        <svg class="mr-2" fill="#006CFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" style="min-width: 24px;">
                          <path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z"/>
                        </svg>
                        <span style="min-width: 120px;">{{ course.primary_category?.title || 'Categoría' }}</span>
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
                      <svg class="mr-2" fill="#057500" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
                        <path d="M570-104q-23 23-57 23t-57-23L104-456q-11-11-17.5-26T80-514v-286q0-33 23.5-56.5T160-880h286q17 0 32 6.5t26 17.5l352 353q23 23 23 56.5T856-390L570-104Zm-57-56 286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640ZM160-800Z"/>
                      </svg>
                      <span :class="course.is_free ? 'text-gray-500' : 'text-green-700'">
                        {{ course.is_free ? 'Gratis' : course.price }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </router-link>

          </div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";

import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import logoUdemy from "../../../assets/logo-udemy.jpg";
import Sidebar from "../../../components/Sidebar.vue";
import Filtros from "../../../components/Filtros.vue";

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
