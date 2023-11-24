<template>
  <div class="p-0 min-h-screen bg-white">
    <!-- Banner -->
    <div :class="{ 'blurred-background': isInputClicked }" class="pt-12">
      <h1 class="text-center font-bold text-3xl text-gray-900 pt-4">Encuentra tu próximo curso</h1>
    </div>

    <!-- Campo de búsqueda -->
    <div class="max-w-lg mx-auto pt-8 p-4">
      <form @submit.prevent="search" class="flex p-1 bg-white items-center border rounded-xl overflow-hidden shadow-lg" >
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

    <!-- Acerca de Nosotros -->
    <div :class="{ 'blurred-background': isInputClicked }" class="flex flex-col md:flex-row container mx-auto md:px-40 p-0 bg-white">
      <img src="../assets/banner-1.jpg" alt="Descripción de la imagen" class="md:w-1/2 object-cover md:h-full" />
      <div class="md:w-1/2 p-8 items-center">
        <!-- Contenido Acerca de Nosotros -->
        <h2 class="text-left text-2xl font-semibold pb-4">Acerca de Nosotros</h2>
        <p>
          Somos una plataforma web y aplicación móvil que funciona como un buscador de 
          cursos. Seguimos un enfoque similar al de los populares motores de búsqueda 
          de vuelos y hoteles. Sin embargo, nuestro principal propósito es recopilar y 
          presentar los cursos de mayor calidad y mejor valorados disponibles en línea. 
          Nos dedicamos a reunir información de una amplia gama de cursos educativos de 
          diversas temáticas y niveles de dificultad, provenientes de fuentes 
          diversas en Internet.
        </p>
      </div>
    </div>

    <!-- El curso que quieras, cuando quieras -->
    <div class="block flex-col md:flex-row max-w-screen-full mx-auto px-24 py-12 bg-indigo-100">
      <h2 class="text-center text-4xl font-bold pb-4 text-indigo-900">
        El curso que quieras, cuando quieras
      </h2>
      <img src="../assets/banner-curseek.png" alt="Imágen ilustrativa mapa" class="object-cover md:w-full" />

      <!-- Lista de Proveedores y Universidades -->
      <div class="container mx-auto p-2">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          <!-- Contenido de Proveedores -->
          <div class="text-center sm:border-r border-gray-400">
            <h2 class="text-2xl font-bold mb-2 pb-4">Proveedores</h2>
            <ul class="list-none text-left">
              <li class="flex items-center justify-center">
                <a href="/cursos/udemy">
                  <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                    <img class="w-12" src="../assets/instituciones/Udemy.png" alt="Logo Udemy">
                    <span class="ml-2 text-xl font-semibold text-black">Udemy</span>
                  </button>
                </a>
              </li>
            </ul>
          </div>

          <!-- Contenido de Universidades -->
          <div class="text-center sm:border-r border-gray-400">
            <h2 class="text-2xl font-bold mb-2 pb-4">Universidades</h2>
            <ul class="list-none text-left">
              <li class="flex items-center justify-center">
                <a href="/cursos/utn">
                  <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                    <img class="w-12" src="../assets/instituciones/utn.png" alt="Logo Universidad UTN">
                    <span class="ml-2 text-xl font-semibold text-black">UTN</span>
                  </button>
                </a>
              </li>
            </ul>
          </div>
          
          <!-- Contenido de Futuro -->
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-2 pb-4">Futuras Instituciones</h2>
            <ul class="list-none text-left">
              <li class="flex items-center justify-center">
                <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                  <img class="w-12" src="../assets/instituciones/UNAM.png" alt="Logo Universidad de México UNAM">
                  <span class="ml-2 text-xl font-semibold text-black">UNAM</span>
                </button>
              </li>
              <li class="flex items-center justify-center">
                <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                  <img class="w-12" src="../assets/instituciones/Universidad_de_Chile.png" alt="Logo Universidad de Chile">
                  <span class="ml-2 text-xl font-semibold text-black">U. de Chile</span>
                </button>
              </li>
              <li class="flex items-center justify-center">
                <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                  <img class="w-12" src="../assets/instituciones/coursera.png" alt="Logo Coursera">
                  <span class="ml-2 text-xl font-semibold text-black">Coursera</span>
                </button>
              </li>
              <li class="flex items-center justify-center">
                <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                  <img class="w-12" src="../assets/instituciones/Universidad_Central_de_Venezuela.png" alt="Logo Universidad_Central_de_Venezuela">
                  <span class="ml-2 text-xl font-semibold text-black">U. C. Venezuela</span>
                </button>
              </li>
              <li class="flex items-center justify-center">
                <button class="hover:scale-110 hover:bg-indigo-300 rounded-lg transform transition duration-200 ease-in-out w-full sm:w-60 flex items-center">
                  <img class="w-12" src="../assets/instituciones/edX.png" alt="Logo edX">
                  <span class="ml-2 text-xl font-semibold text-black">edX</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
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
<style scoped>
.blurred-background {
  filter: blur(5px);
}
</style>