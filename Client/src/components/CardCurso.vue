

<template>
  <a :href="'/curso/' + course._id" class="block bg-white shadow-md mt-2 min-w-max rounded-lg p-4 hover:shadow-lg transition-shadow">
    
    <!-- Contenido Principal de la Card -->
    <div class="flex items-center">
     
      <img :src="course.imgUrl" alt="Imagen del curso" class="w-1/4 rounded mr-4">

      <div class="w-3/4">
      
        <h2 class="text-xl mb-2">{{ course.title }}</h2>
        
      
        <div class="flex justify-between items-center mt-4">
          
          <a :href="'/modalidad/' + course.modalidad" class="text-blue-500 hover:underline">{{ course.modalidad }}</a>
        
          <span class="text-gray-500">{{ course.price }}</span>
        </div>
        <CategoriaBadge :categoria="course.category"/>
        <div class="mt-2 text-sm text-gray-400">{{ course.startDate }}</div>

      </div>
    </div>
  </a>
</template>

<script>
import CategoriaBadge from './categoriaTag.vue'; // Asegúrate de proporcionar la ruta correcta


export default {
  components: {
    CategoriaBadge, // Aquí es donde declaras tus componentes locales
    
  },
  props: {
    course: {
      type: Object,
      required: true
    }
  }
}


</script>
