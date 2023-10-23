<template>
  <div>
    <h1 class="text-2xl mb-4 text-center">Cursos de {{ categoria }} de la UTN</h1> 
    <div v-for="course in courses" :key="course._id">
      <CardCurso :course="course" />
    </div>
    <Paginacion
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>

<script>
import axios from "axios";
import CardCurso from "../components/CardCurso.vue";
import Paginacion from "../components/Paginacion.vue";

export default {
  components: {
    CardCurso,
    Paginacion,
  },
  data() {
    return {
      courses: [],
      currentPage: 1,
      totalPages: 1,
    };
  },
  props: {
    categoria: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.loadCursos(this.currentPage);
  },
  methods: {
    async loadCursos(page) {
      try {
        const response = await axios.get(
          `http://localhost:3333/cursos?categoria=${this.categoria}&page=${page}`
        );
        this.courses = response.data.courses;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error("Error al obtener los cursos:", error);
      }
    },
    handlePageChange(newPage) {
        this.currentPage = newPage;  // Asegúrate de que esta línea está presente
        this.loadCursos(newPage);
}
  },
};
</script>
