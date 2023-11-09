<template>
  <div class="bg-white">
    <Portada
    title="Cursos de la UTN"
     description="Esta es una universidad argentina que viene de la Universidad Obrera Nacional. Es la única en Argentina que se enfoca principalmente en ingenierías y que está en todo el país. Aunque su oficina principal está en Buenos Aires, tiene 30 sedes en diferentes lugares de Argentina. Es la universidad de ingeniería con más estudiantes en el país."
    :totalCourses="totalCourses" />

    <div
      class="flex flex-col md:flex-row container mx-auto p-4 md:p-20 bg-gray-100"
    >
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
        <div>
        <div v-for="course in courses" :key="course._id" class="mb-4">
          <!-- Aquí comienza la tarjeta individual para cada curso -->
          <a :href="'/curso/' + course._id" class="block max-w-full bg-white shadow-md mt-2 rounded-lg p-4 hover:shadow-lg transition-shadow">
            <div class="flex flex-col md:flex-row items-start md:items-center">
              <img :src="course.imgUrl" alt="Imagen del curso" class="w-full md:w-1/4 rounded mb-4 md:mb-0 md:mr-4">
              <div class="flex-grow">
                <h2 class="text-lg md:text-xl mb-2">{{ course.title }}</h2>
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
                  <a :href="'/modalidad/' + course.modalidad" class="text-blue-500 hover:underline mb-2 md:mb-0">{{ course.modalidad }}</a>
                  <span class="text-gray-500">{{ course.price }}</span>
                </div>
                <!-- Aquí se integra la etiqueta de categoría directamente -->
                <span class="text-sm bg-blue-200 text-blue-700 py-1 px-2 rounded">
                  {{ course.category }}
                </span>
                <div class="mt-2 text-xs md:text-sm text-gray-400">{{ course.startDate }}</div>
              </div>
            </div>
          </a>
          <!-- Aquí termina la tarjeta individual -->
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
import { ref, onMounted } from "vue";
import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import Sidebar from "../../../components/Sidebar.vue";
import Filtros from "../../../components/Filtros.vue";

axios.defaults.baseURL = "http://localhost:3333";

// Estado
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const categories = ref([]);
const selectedCategories = ref([]);
const filterType = ref(null);

// Métodos y handlers
const loadCourses = async (
  page,
  filterType = null,
  selectedCategories = []
) => {
  let queryParams = `page=${page}`;

  if (filterType) {
    queryParams += `&filter=${filterType}`;
  }

  if (selectedCategories.length > 0) {
    queryParams += `&categories=${selectedCategories.join(",")}`;
  }

  try {
    const { data } = await axios.get(`cursos/utn?${queryParams}`);
    console.log("Data received from API:", data); // Agregado para debuggear
    courses.value = data.courses;

    // Asegúrate de que 'data.totalPages' existe y es un número, de lo contrario usa un valor predeterminado
    totalPages.value =
      typeof data.totalPages === "number" ? data.totalPages : 1;
    totalCourses.value = data.totalCourses;
  } catch (error) {
    console.error("Error al obtener los cursos:", error);
    const errorMessage =
      error.response?.data?.message || "Error al cargar los cursos";
    alert(errorMessage);
  }
};

const handleCategoryFilter = async (categories) => {
  selectedCategories.value = categories;
  courses.value = [];
  currentPage.value = 1;
  await loadCourses(currentPage.value, null, selectedCategories.value);
};

const loadCategories = async () => {
  try {
    const { data } = await axios.get("categorias/utn");
    categories.value = data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
  }
};

const handleFilterChange = (newFilterType) => {
  filterType.value = newFilterType;
  courses.value = [];
  currentPage.value = 1;
  loadCourses(currentPage.value, filterType.value, selectedCategories.value);
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses(currentPage.value, filterType.value, selectedCategories.value);
};


// Montaje
onMounted(() => {
  loadCourses(currentPage.value, filterType.value, selectedCategories.value);

  loadCategories();
});
</script>
