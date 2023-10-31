<template>
  <a :href="'/curso/' + course._id" class="block bg-white shadow-md mt-2 min-w-max rounded-lg p-4 hover:shadow-lg transition-shadow">
    
    <!-- Contenido Principal de la Card -->
    <div class="flex flex-col md:flex-row items-start md:items-center">
     
      <img :src="course.imgUrl" alt="Imagen del curso" class="w-full md:w-1/4 rounded mb-4 md:mb-0 md:mr-4">

      <div class="flex-grow">
      
        <h2 class="text-lg md:text-xl mb-2">{{ course.title }}</h2>
      
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mt-4">
          
          <a :href="'/modalidad/' + course.modalidad" class="text-blue-500 hover:underline mb-2 md:mb-0">{{ course.modalidad }}</a>
        
          <span class="text-gray-500">{{ course.price }}</span>
        </div>
        <CategoriaBadge :categoria="course.category"/>
        <div class="mt-2 text-xs md:text-sm text-gray-400">{{ course.startDate }}</div>

      </div>
    </div>
  </a>
</template>



<script setup>
import CategoriaBadge from './CategoriaTag.vue'; // Asegúrate de proporcionar la ruta correcta

const props = defineProps ({
  course: {
      type: Object,
      required: true
    }
})
</script>