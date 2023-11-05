<template>
  <div class="bg-white">
    <Portada
      title="Cursos de UDEMY"
      description="Udemy es una plataforma en línea que ofrece cursos en video sobre una amplia variedad de temas. Estos cursos son creados por instructores individuales o empresas y están diseñados para ayudar a las personas a aprender nuevas habilidades o mejorar sus conocimientos en áreas específicas. "
      :totalCourses="totalCourses"
      :imageSrc="logoUdemy"
    />

    <div class="container mx-auto p-4 md:p-20 bg-gray-100">
      <!-- Contenido principal -->
      <div class="flex flex-wrap -mx-4">
        <!-- Tarjetas de Cursos -->
        <div
          v-for="course in courses"
          :key="course.id"
          class="p-4 w-full sm:w-1/2 lg:w-1/3"
        >
          <div
            :class="{
              'bg-green-100': course.is_free,
              'bg-white': !course.is_free,
            }"
            class="p-6 rounded-lg shadow-lg transition duration-300 ease-in-out hover:shadow-2xl"
          >
            <router-link
              :to="{ name: 'DetalleCursoUdemy', params: { id: course._id } }"
              class="block hover:no-underline"
            >
              <img
                :src="course.image_480x270"
                alt="Imagen del Curso"
                class="rounded w-full mb-6 hover:opacity-90"
              />
              <h3 class="text-lg font-semibold mb-2 hover:text-blue-600">
                {{ course.title }}
              </h3>
              <p class="text-gray-700 text-base mb-4">{{ course.headline }}</p>
              <div
                v-for="instructor in course.instructors"
                :key="instructor._id"
                class="flex items-center mb-4"
              >
                <img
                  :src="instructor.image_100x100"
                  alt="Instructor"
                  class="rounded-full w-12 h-12 mr-2"
                />
                <span class="text-sm">{{ instructor.name }}</span>
              </div>
              <div class="flex justify-between items-center mt-4">
                <span :class="course.price === 'Free' || course.price === 'Gratis' ? 'text-green-800 text-lg bg-green-200 font-semibold px-2 py-1 rounded-full text-sm' : 'text-xl font-bold'">
  {{ course.price }}
</span>
                <span
                  class="inline-block bg-blue-500 text-white text-xl font-bold py-2 px-4 rounded-full hover:bg-blue-600 cursor-pointer"
                >
                  Ver Detalles
                </span>
              </div>
            </router-link>
          </div>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Paginacion from "../../../components/Paginacion.vue";
import Portada from "../../../components/Portada.vue";
import logoUdemy from "../../../assets/logo-udemy.png";
axios.defaults.baseURL = "http://localhost:3333";

// Estado
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const totalCourses = ref(0);

// Métodos y handlers
const loadCourses = async (page) => {
  try {
    const { data } = await axios.get(`cursos/udemy?page=${page}`);
    courses.value = data.courses;
    totalPages.value =
      typeof data.totalPages === "number" ? data.totalPages : 1;
    totalCourses.value = data.totalCourses;
  } catch (error) {
    console.error("Error al obtener los cursos de Udemy:", error);
    alert("Error al cargar los cursos");
  }
};

const handlePageChange = (newPage) => {
  currentPage.value = newPage;
  loadCourses(currentPage.value);
};

// Montaje
onMounted(() => {
  loadCourses(currentPage.value);
});
console.log(courses.value);
</script>
