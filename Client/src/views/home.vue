<template>
  <div class="p-4 min-h-screen flex flex-col items-center bg-white">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-extrabold text-black-900">Encuentra tu Curso</h1>
    </div>

    <div class="max-w-screen-xl mx-auto w-full flex items-center justify-center">
      <!-- Imagen con enlace del lado derecho -->
      <div class="w-2/3 md:w-1/3 md:ml-auto md:mr-0 mt-6">
        <a href="https://ccweb.imgix.net/https%3A%2F%2Fwww.classcentral.com%2Fimages%2F%2Fillustrations%2Fhomepage-hero%2Fhero-halloween.png?auto=format&h=650&ixlib=php-4.1.0&s=88e0a1846e26c03246b7913d5f900bda" target="_blank">
          <img class="w-full" src="https://ccweb.imgix.net/https%3A%2F%2Fwww.classcentral.com%2Fimages%2F%2Fillustrations%2Fhomepage-hero%2Fhero-halloween.png?auto=format&h=650&ixlib=php-4.1.0&s=88e0a1846e26c03246b7913d5f900bda" alt="Never stop learning.">
        </a>
      </div>

      <!-- Campo de búsqueda con sombra y título alineado a la izquierda -->
      <div class="w-full md:w-2/3 md:ml-0 md:mr-auto">
        <form @submit.prevent="search" class="flex items-center border rounded-lg overflow-hidden shadow-md p-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
          </svg>
          <input v-model="query" placeholder="Busca 500 cursos..." class="p-2 flex-grow outline-none" @focus="blurBackground" @blur="unblurBackground"/>
          <!-- <button type="submit" class="px-4 bg-purple-900 text-white">Buscar</button> -->
        </form>
      </div>
    </div>

    <!-- Resultados -->
    <div class="mt-6 w-full">
      <CardCurso v-for="course in courses" :key="course._id" :course="course" />
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
      },
      blurBackground() {
        document.querySelector('.p-4').style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
      },
      unblurBackground() {
        document.querySelector('.p-4').style.backgroundColor = 'transparent';
      },
  }
};
</script>
