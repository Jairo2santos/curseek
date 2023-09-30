<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">Cursos de la UTN</h1>
    <div v-for="course in courses" :key="course._id" class="mb-4">
      <CardCurso :course="course"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CardCurso from '../components/cardCurso.vue';


export default {
  components: {
    CardCurso  
  },
  data() {
    return {
      courses: []
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/utn');
      this.courses = response.data;
    } catch (error) {
      console.error('Error al obtener los cursos:', error);
    }
  }
}
</script>
