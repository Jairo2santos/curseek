<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold my-4">Error 404, esta pagina parece no existir</h1>
        <p class="text-lg mb-4">Disculpanos, no pudimos encontrar tu pagina en todo caso si buscas un curso puedes intentar buscarlo:</p>
      <!-- Buscador -->
     <!-- Campo de búsqueda -->
     <div class="max-w-3xl mx-auto pt-8 p-4">
      <form @submit.prevent="search" class="flex p-1 min-w-full bg-white items-center border rounded-xl overflow-hidden shadow-lg" >
        <button type="submit" class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24">
            <path
              d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"
            />
          </svg>
        </button>
        <input
          v-model="query"
          placeholder="Buscar más de 10,000 cursos"
          class="rounded-xl p-3 flex-grow outline-none "
          @focus="setInputClicked(true)"
          @blur="setInputClicked(false)"
        />
        <button v-if="query" type="button" @click="clearSearch" class="p-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </form>
    </div>

    <!-- Resultados -->
  <div class="flex justify-center">
    <div v-if="courses.length > 0" class="absolute max-w-3xl   mt-1 bg-white shadow-lg max-h-96 overflow-y-auto z-10">
      <p class="px-4 py-2 text-sm text-gray-500 border-b">Los cursos que se relacionan con"{{ query }}"</p>
      <ul>
        <li v-for="course in courses" :key="course._id" class="border-b last:border-b-0">
          <a
            @click="redirectToCourse(course)"
            class="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
          >
            <img :src="course.image" alt="Course" class="w-16 h-16 rounded-full object-cover mr-4">
            <div>
              <h2 class="font-bold">{{ course.title }}</h2>
              <p class="text-xs text-gray-600">{{ course.source}}</p>
            </div>
          </a>
         </li>
       </ul>
    </div>    
   </div>

     <!-- Imagen y mensaje de error -->
     <div class="text-center">
        <img src="../assets/404.webp" alt="Not Found" class="mx-auto" />
       
      </div>
    </div>
  </template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();
const query = ref('');
const courses = ref([]);
const isInputClicked = ref(false);


const search = async () => {
  try {
    const response = await axios.get(`http://localhost:3333/cursos/search?q=${query.value}`);
    courses.value = response.data;
  } catch (error) {
    console.error("Error al buscar cursos:", error);
  }
};

const clearSearch = () => {
  query.value = '';
  courses.value = [];
};

const setInputClicked = (clicked) => {
  isInputClicked.value = clicked;
};

const redirectToCourse = (course) => {
  if (course.source === 'UDEMY') {
    // Asegúrate de que 'originalId' sea el ID original del curso de Udemy
    router.push({ name: 'DetalleCursoUdemy', params: { id: course.originalId } });
  } else if (course.source === 'UTN') {
    // Asegúrate de que 'originalId' sea el ID original del curso de UTN
    router.push({ name: 'DetalleCursoUTN', params: { id: course.originalId } });
  }
};
</script>