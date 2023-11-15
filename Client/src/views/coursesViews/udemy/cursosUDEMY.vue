<template>
  <div class="bg-white">
    <Portada
      title="Cursos de UDEMY"
      description="Udemy es una plataforma en línea que ofrece cursos en video sobre una amplia variedad de temas..."
      :totalCourses="totalCourses"
      :imageSrc="logoUdemy"
    />

    <div class="flex flex-col md:flex-row container mx-auto pt-6 md:px-40 bg-gray-100 p-4">
      <!-- Sidebar a la izquierda -->
      <div class="mb-4 md:mb-0 w-full md:w-auto">
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
          <!-- Tarjetas de Cursos una debajo de la otra -->
          <div
            v-for="course in courses"
            :key="course.id"
            class="mb-5"
          >
            <!-- Tarjeta de Curso -->
            <router-link
      :to="{ name: 'DetalleCursoUdemy', params: { id: course._id } }"
      class="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow"
    >
      <div class="flex flex-col md:flex-row items-start md:items-center">
        <img :src="course.image_480x270" alt="Imagen del curso" class="w-full md:w-48 rounded mb-4 md:mb-0 md:mr-4">
        <div class="flex-grow">
          <h2 class="text-lg md:text-xl mb-2">{{ course.title }}</h2>
          <p class="text-gray-700 text-base mb-4">{{ course.headline }}</p>
          <div class="flex justify-between items-center mt-4">
            <div>
              <div v-if="course.instructors && course.instructors.length" class="flex items-center mb-4">
                <img :src="course.instructors[0].image_100x100" alt="Instructor" class="rounded-full w-12 h-12 mr-2">
                <span class="text-sm">{{ course.instructors[0].name }}</span>
              </div>
              <span class="text-sm bg-blue-100 text-blue-700 py-1 px-2 rounded">
                {{ course.primary_category?.title || 'Categoría' }}
              </span>
            </div>
            <span
              :class="course.is_free ? 'text-green-700' : 'text-gray-500'"
            >
              {{ course.is_free ? 'Gratis' : course.price }}
            </span>
          </div>
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
