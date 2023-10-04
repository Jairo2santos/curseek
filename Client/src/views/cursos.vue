<!-- Cursos.vue -->
<template>
  <div class="p-4">
    <Portada :totalCourses="totalCourses" />
  </div>
  <div class="flex container mx-auto">
    <div class="mr-4">
      <Sidebar
        :categories="categories"
        @filter-by-category="handleCategoryFilter"
      />
    </div>
    <div >
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
</template>

<script>
import axios from "axios";
import CardCurso from "../components/cardCurso.vue";
import Paginacion from "../components/Paginacion.vue";
import Portada from "../components/Portada.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    CardCurso,
    Paginacion,
    Portada,
    Sidebar,
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
    async loadCategories() {
    try {
      const response = await axios.get(`http://localhost:3000/categorias`);  // Ajusta la URL si es necesario.
      this.categories = response.data;
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  },
    async loadCursos(page) {
      try {
        const response = await axios.get(
          `http://localhost:3000/cursos?page=${page}`
        );
        console.log(response.data);
        this.courses = response.data.courses;
        this.totalPages = response.data.totalPages;
        this.totalCourses = response.data.totalCourses;
        
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
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
    const url = `http://localhost:3000/cursos?categories=${selectedCategories.join(",")}`;
    console.log("URL de petición:", url);  // Agregamos el log para revisar la URL

    try {
        const response = await axios.get(url); // Usamos la constante url
        console.log("Respuesta del servidor:", response.data);  // Agregamos el log para revisar la respuesta del servidor

        this.courses = response.data.courses;
        this.totalPages = response.data.totalPages;
        this.totalCourses = response.data.totalCourses;
    } catch (error) {
        console.error("Error al filtrar los cursos:", error);
    }
}
    
  },
};
</script>
