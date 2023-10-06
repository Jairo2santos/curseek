<!-- Cursos.vue -->
<template>
  <div class="flex container mx-auto p-4">
    <!-- Sidebar a la izquierda -->
    <div>
      <Sidebar
        :categories="categories"
        @filter-by-category="handleCategoryFilter"
      />
    </div>

    <!-- Contenido a la derecha del Sidebar -->
    <div class="flex flex-col w-full ml-4">
      <!-- Filtros arriba -->
      <div>
        <Filtros @filter-changed="handleFilterChange" />
      </div>

      <!-- Cursos abajo -->
      <div>
        <div v-for="course in courses" :key="course._id" class="mb-4 min-w-max">
          <CardCurso :course="course" />
        </div>

        <Paginacion
          :currentPage="currentPage"
          :totalPages="totalPages"
          @changePage="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CardCurso from "../components/CardCurso.vue";
import Paginacion from "../components/Paginacion.vue";
import Portada from "../components/Portada.vue";
import Sidebar from "../components/Sidebar.vue";
import Filtros from "../components/Filtros.vue";

export default {
  components: {
    CardCurso,
    Paginacion,
    Portada,
    Sidebar,
    Filtros,
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      totalPages: 1,
      totalCourses: 0,
      categories: [],
    };
  },
  async created() {
    this.loadCursos(this.currentPage);
    this.loadCategories();
  },
  methods: {
    editCourse() {
        this.$router.push(`/editar-curso/${this.course._id}`);
    },
    async loadCategories() {
      try {
        const response = await axios.get(`http://localhost:3000/categorias`); // Ajusta la URL si es necesario.
        this.categories = response.data;
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    },
    async loadCursos(page, filterType = null) {
      const filterQueryParam = filterType ? `&filter=${filterType}` : "";
      try {
        const response = await axios.get(
          `http://localhost:3000/cursos?page=${page}${filterQueryParam}`
        );
        this.courses = response.data.courses;
        this.totalPages = response.data.totalPages;
        this.totalCourses = response.data.totalCourses;
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    },
    handleFilterChange(filterType) {
      this.loadCursos(1, filterType);
      console.log("Filtro recibido en Cursos.vue:", filterType);
    },
    handlePageChange(newPage) {
      this.currentPage = newPage;
      this.loadCursos(newPage);
      this.loadCategories();
    },
    async handleCategoryFilter(selectedCategories) {
      this.courses = [];
      this.currentPage = 1;
      console.log("Categorías recibidas en Cursos.vue:", selectedCategories);

      // Construcción de la URL
      const url = `http://localhost:3000/cursos?categories=${selectedCategories.join(
        ","
      )}`;
      console.log("URL de petición:", url); // Agregamos el log para revisar la URL

      try {
        const response = await axios.get(url); // Usamos la constante url
        console.log("Respuesta del servidor:", response.data); // Agregamos el log para revisar la respuesta del servidor

        this.courses = response.data.courses;
        this.totalPages = response.data.totalPages;
        this.totalCourses = response.data.totalCourses;
      } catch (error) {
        console.error("Error al filtrar los cursos:", error);
      }
    },
  },
};
</script>
