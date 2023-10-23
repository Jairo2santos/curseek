<template>
  <div class="p-4 min-h-screen">
    <div>
      <h1 class="text-center text-3xl font-extrabold text-black-900 mb-8">Encuentra tu Curso</h1>

      <!-- Campo de búsqueda con sombra -->
      <div class="max-w-lg mx-auto">
        <form @submit.prevent="search" class="flex items-center border rounded-lg overflow-hidden shadow-md p-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          <input v-model="query" placeholder="Busca 500 cursos..." class="p-2 flex-grow outline-none"/>
          <!-- <button type="submit" class="px-4 bg-purple-900 text-white">Buscar</button> -->
        </form>
      </div>

      <!-- Resultados -->
      <div class="mt-6">
        <CardCurso v-for="course in courses" :key="course._id" :course="course" />
      </div>
    </div>
  </div>
</template>


<script>
import CardCurso from '../components/CardCurso.vue';
import axios from 'axios';

export default {
  components: { CardCurso },
  data() {
      return {
          query: '',
          courses: []
      };
  },
  methods: {
      async search() {
          try {
              const response = await axios.get(`http://localhost:3333/cursos/search?q=${this.query}`);
              this.courses = response.data;
          } catch (error) {
              console.error("Error al buscar cursos:", error);
          }
      }
  }
};
</script>
