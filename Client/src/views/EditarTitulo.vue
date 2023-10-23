<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-1/2 bg-white p-6 rounded shadow">
      <input v-model="newTitle" class="border p-2 w-full" placeholder="Nuevo título"/>
      <button @click="updateTitle" class="mt-4 bg-blue-500 text-white p-2 rounded w-full">Actualizar</button>
      <div v-if="message" class="mt-4">{{ message }}</div>
    </div>
  </div>
</template>
  <script>
  import axios from "axios";
  
  export default {
    props: {
      courseId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        newTitle: this.title,
        message: ""
      };
    },
    methods: {
      async updateTitle() {
        try {
          const response = await axios.put(`http://localhost:3333/cursos/${this.courseId}/title`, {
            title: this.newTitle
          });
          this.message = response.data.message;
           // Redirigir al usuario a la página anterior
          this.$router.go(-1);
        } catch (error) {
          console.error("Error al actualizar el título:", error);
          this.message = "Error al actualizar el título.";
        }
      }
    }
  };
  </script>
  