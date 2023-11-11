<template>
  <div class="bg-gray-100 p-4">
    <div class="md:p-6 max-w-screen-xl mx-auto">
      <!-- Grilla Principal -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <!-- Columna 1 y 2 (Contenido principal) -->
        <div class="md:col-span-2">
          <!-- Sección de Título, Duración y Precio -->
          <div class="bg-white p-4 md:p-6 rounded hover:shadow-lg transition mb-4 justify-between items-center">
            <h1 class="text-2xl md:text-3xl font-bold text-gray-800">{{ course.title }}</h1>
            <p class="text-xl mb-2 ">{{ course.duration }}</p>
            <h2 class="text-3xl md:text-3xl font-semibold text-green-500">{{ course.price }}</h2>
          </div>

          <!-- Sección de Resumen -->
          <div class="bg-white p-6 rounded hover:shadow-lg transition mb-4">
            <h3 class="text-xl mb-2 font-bold">Resumen</h3>
            <p>{{ course.summary }}</p>
          </div>

          <!-- Sección de Modalidades -->
          <div class="bg-white p-6 rounded hover:shadow-lg transition mb-4">
            <h3 class="text-xl mb-2 font-bold">Modalidades</h3>
            <ul class="list-disc pl-8">
              <li v-for="modality in course.modalities" :key="modality">{{ modality }}</li>
            </ul>
          </div>

          <!-- Sección de Profesores -->
          <div class="bg-white p-6 rounded hover:shadow-lg transition mb-4">
            <h3 class="text-xl mb-2 font-bold">Profesores</h3>
            <p>{{ course.teachers }}</p>
          </div>
        </div>

        <!-- Columna 3 (Barra Lateral) -->
        <div class="bg-white p-4 md:p-6 rounded hover:shadow-lg transition">
          <img :src="course.imgUrl" alt="Imagen del Curso" class="rounded mb-4">
          <a :href="course.link" target="_blank"
            class="flex bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 transition-colors duration-300 ease-in-out w-full items-center justify-center">
            Ir al curso
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="24" class="ml-2">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z" fill="#fff" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
  
  
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      course: {}
    };
  },
  async created() {

    const courseId = this.$route.params.id;

    try {
      const response = await axios.get(`http://localhost:3333/cursos/utn/${courseId}`);
      this.course = response.data;
    } catch (error) {
      console.error("Error obteniendo el detalle del curso:", error);
    }
  },
  methods: {

  }
};
</script>
  