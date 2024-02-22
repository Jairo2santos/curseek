<template>
  <div class="bg-white">
    <Portada :title="pageTitle" :description="pageDescription" :totalCourses="totalCourses" :imageSrc="logoCoursera" />
    <div class="flex flex-col max-w-screen-full md:flex-row mx-auto pt-6 md:px-40 bg-gray-100 p-4">
      <!-- Sidebar a la izquierda -->
      <div class="mb-4 md:mb-0 w-full md:w-auto mt-4">
        <Sidebar :categories="categories" @filter-by-category="handleCategoryFilter" />
      </div>
      <!-- Contenido a la derecha del Sidebar -->
      <div class="flex flex-col w-full md:ml-6">
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
              <div @click="navigateToCourse(course.slug)" class="block max-w-full bg-white mt-2 rounded-lg p-4 hover:shadow-md transition cursor-pointer">
  <div class="flex flex-col lg:flex-row items-start">
    <!-- Contenedor Izquierdo: Imagen + Título + Descripción -->
    <div class="flex w-full lg:w-8/12 items-start mb-4 lg:mb-0">
      <img :src="course.imgUrl" alt="Foto principal del curso" class="w-48 h-28 object-cover rounded mr-4" />
      <div class="flex flex-col justify-between">
        <!-- Título -->
        <h2 class="text-lg font-semibold hover:underline">
          {{ course.title }}
        </h2>
        <!-- Descripción debajo del Título e Imagen -->
        <p class="text-sm text-gray-700 mt-2">
          {{ course.shortDescription !== "No short description found" ? course.shortDescription : course.longDescription.substring(0, 100) + "..." }}
        </p>
      </div>
    </div>
    <!-- Contenedor Derecho: Instructor, Universidad, Nivel, Tiempo Estimado, Categoría Principal -->
    <div class="flex flex-col lg:w-4/12 items-end">
      <!-- Instructor -->
      <div class="flex items-center mb-2 w-full justify-end">
        <img :src="course.instructors[0].imageUrl" alt="Instructor" class="rounded-full w-8 mr-2" />
        <span>{{ course.instructors[0].name }}</span>
      </div>
      <!-- Universidad -->
      <div class="text-right w-full text-blue-500 mb-2">
        Universidad: {{ course.university }}
      </div>
      <!-- Nivel -->
      <div class="text-right w-full mb-2">
        Nivel: {{ course.level }}
      </div>
      <!-- Duración Estimada -->
      <div class="text-right w-full mb-2">
        Tiempo estimado: {{ course.estimatedTime }}
      </div>
      <!-- Categoría Principal -->
      <div class="text-right w-full">
        Categoría: {{ course.mainCategory }}
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import { useRouter } from "vue-router";
//import logoUdemy from "../../../assets/logo-udemy.jpg";
import Sidebar from "../../../components/Sidebar.vue";
//import Favoritos from "../../../components/Favoritos.vue";
import logoCoursera from "../../../assets/Coursera-Logo.png";
// Estado y métodos actualizados para manejar los datos de Coursera
const pageTitle = "Cursos de Coursera";
const pageDescription =
  "Coursera es una plataforma de educación en línea que ofrece cursos, especializaciones y grados de universidades y organizaciones reconocidas. Permite a los usuarios aprender a su ritmo en una variedad de temas, desde negocios hasta tecnología. Los cursos incluyen videos, lecturas y foros. Algunos son gratuitos, pero también hay opciones pagas para obtener certificados. Coursera facilita el acceso a educación de calidad para mejorar habilidades o avanzar profesionalmente.";
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);
const categories = ref([]);
const isLoading = ref(false);
axios.defaults.baseURL = "http://localhost:3333";
const router = useRouter();

const loadCourses = async (
  page = currentPage.value,
  selectedCategories = []
) => {
  isLoading.value = true;
  let queryParams = `page=${page}`;
  if (selectedCategories.length > 0) {
    // Asume que solo se filtra por una categoría a la vez para simplificar
    queryParams += `&category=${encodeURIComponent(selectedCategories[0])}`;
  }
  try {
    const response = await axios.get(`cursos/coursera?${queryParams}`);
    courses.value = response.data.courses; // Ajusta según la estructura de tu respuesta
    totalPages.value = response.data.totalPages || 1;
    totalCourses.value = response.data.totalCourses || 0;
  } catch (error) {
    console.error("Error al obtener los cursos de Coursera:", error);
  } finally {
    isLoading.value = false;
  }
};

const loadCategories = async () => {
  try {
    const { data } = await axios.get("categorias/coursera");
    categories.value = data;
  } catch (error) {
    console.error("Error al obtener las categorías de coursera:", error);
  }
};
const navigateToCourse = (courseSlug) => {
  if (!courseSlug) {
    console.error("No slug provided for navigation");
    return;
  }
  router.push({ name: "DetalleCursoCoursera", params: { slug: courseSlug } });
};
const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses(currentPage.value);
};
const handleCategoryFilter = async (selectedCategory) => {
  console.log("Filtrando por la categoría:", selectedCategory);
  currentPage.value = 1;
  await loadCourses(currentPage.value, selectedCategory);
};
//loader
// Montaje
onMounted(() => {
  loadCourses(currentPage.value);
  loadCategories();
  console.log(courses.value);
});
</script>
