<template>
  <div class="bg-white">
    <Portada :totalCourses="courses.length" />

    <div class="flex flex-col md:flex-row container mx-auto p-4 md:p-20 bg-gray-100">
      <!-- Sidebar a la izquierda -->
      <div class="mb-4 md:mb-0 w-full md:w-auto">
        <Sidebar
          :categories="categories"
          @filter-by-category="handleCategoryFilter"
        />
      </div>

      <!-- Contenido a la derecha del Sidebar -->
      <div class="flex flex-col w-full ml-0 md:ml-6">
        <!-- Filtros arriba -->
        <div class="mb-4">
          <Filtros @filter-changed="handleFilterChange" />
        </div>

        <!-- Cursos abajo -->
        <div>
          <div v-for="course in courses" :key="course._id" class="mb-4">
            <CardCurso class="max-w-full" :course="course" />
          </div>

          <Paginacion
            :currentPage="currentPage"
            :totalPages="totalPages"
            @changePage="handlePageChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref, onMounted} from 'vue';
import axios from "axios";
import CardCurso from "../components/CardCurso.vue";
import Paginacion from "../components/Paginacion.vue";
import Portada from "../components/Portada.vue";
import Sidebar from "../components/Sidebar.vue";
import Filtros from "../components/Filtros.vue";



axios.defaults.baseURL = 'http://localhost:3333';

// Estado
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const categories = ref([]);

// Métodos y handlers
const loadCourses = async (page, filterType = null) => {
    const filterQueryParam = filterType ? `&filter=${filterType}` : "";
    try {
        const { data } = await axios.get(`cursos?page=${page}${filterQueryParam}`);
        courses.value = data.courses;
        totalPages.value = data.totalPages;
        totalCourses.value = data.totalCourses;
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
};

const handleCategoryFilter = async (selectedCategories) => {
    courses.value = [];
    currentPage.value = 1;
    const url = `cursos?categories=${selectedCategories.join(",")}`;
    try {
        const { data } = await axios.get(url);
        courses.value = data.courses;
        totalPages.value = data.totalPages;
        totalCourses.value = data.totalCourses;
    } catch (error) {
        console.error("Error al filtrar los cursos:", error);
    }
};

const loadCategories = async () => {
    try {
        const { data } = await axios.get('categorias');
        categories.value = data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
    }
};

const handleFilterChange = (filterType) => {
    loadCourses(1, filterType);
};

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    loadCourses(newPage);
    loadCategories();
};



// Montaje
onMounted(() => {
    loadCourses(currentPage.value);
    loadCategories();
});
</script>