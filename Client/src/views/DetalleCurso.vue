<template>
    <div class="bg-gray-100 p-6 max-w-screen-xl mx-auto">
      <!-- Grilla Principal -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Columna 1 y 2 (Contenido principal) -->
        <div class="lg:col-span-2">
          <!-- Sección de Título, Duración y Precio -->
          <div class="bg-white p-6 rounded shadow-lg mb-4  items-center justify-between">
            <div class="flex">
              <h1 class="text-3xl inline-block mr-4">{{ course.title }}</h1>
              <button @click="goToEdit" class="text-purple-600 underline hover:text-purple-700">Editar Título</button>
            </div>
            <div>
              <p class="text-xl mb-2">{{ course.duration }}</p>
              <h2 class="text-2xl text-purple-600">{{ course.price }}</h2>
            </div>
          </div>
  
          <!-- Sección de Resumen -->
          <div class="bg-white p-6 rounded shadow-lg mb-4">
            <h3 class="text-xl mb-2">Resumen del curso</h3>
            <p>{{ course.summary }}</p>
          </div>
  
          <!-- Sección de Modalidades -->
          <div class="bg-white p-6 rounded shadow-lg mb-4">
            <h3 class="text-xl mb-2">Modalidades</h3>
            <ul class="list-disc pl-8">
              <li v-for="modality in course.modalities" :key="modality">{{ modality }}</li>
            </ul>
          </div>
  
          <!-- Sección de Profesores -->
          <div class="bg-white p-6 rounded shadow-lg mb-4">
            <h3 class="text-xl mb-2">Profesores</h3>
            <p>{{ course.teachers }}</p>
          </div>
        </div>
  
        <!-- Columna 3 (Barra Lateral) -->
        <div class="bg-white p-6 rounded shadow-lg">
          <img :src="course.imgUrl" alt="Imagen del Curso" class="mb-4">
          <a :href="course.link" target="_blank" class="block bg-purple-600 text-white text-center py-2 px-4 rounded hover:bg-purple-700 w-full">Ir al curso</a>
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
        const response = await axios.get(`http://localhost:3333/cursos/${courseId}`);
        this.course = response.data;
      } catch (error) {
        console.error("Error obteniendo el detalle del curso:", error);
      }
    },
    methods: {
      goToEdit() {
        this.$router.push(`/editar-titulo/${this.course._id}`);
      }
    }
  };
  </script>
  