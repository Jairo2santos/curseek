<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4 text-center">Cursos de {{ categoria }} de la UTN</h1> 
    <div class="block  gap-4">
      <div v-for="course in courses" :key="course._id">
        <CardCurso  :course="course" />
      </div>
    </div>
    <Paginacion
      class="mt-4"
      :currentPage="currentPage"
      :totalPages="totalPages"
      @changePage="handlePageChange"
    />
  </div>
</template>


<script setup>

import { ref, onMounted } from 'vue';
import axios from "axios";
import CardCurso from "../components/CardCurso.vue";
import Paginacion from "../components/Paginacion.vue";

// Estado
const courses = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const { categoria } = defineProps({
  categoria: {
    type: String,
    required: true,
  },
});

const loadCursos = async (page) => {
    try {
        const response = await axios.get(
          `http://localhost:3333/cursos?categoria=${categoria}&page=${page}`
        );
        courses.value = response.data.courses;
        totalPages.value = response.data.totalPages;
    } catch (error) {
        console.error("Error al obtener los cursos:", error);
    }
}

const handlePageChange = (newPage) => {
    currentPage.value = newPage;
    loadCursos(newPage);
}

onMounted(() => {
    loadCursos(currentPage.value);
});

</script>
