<template>
    <div class="profile-card-container flex justify-center items-center h-screen bg-gray-200">
      <div class="profile-card bg-white p-6 rounded-lg shadow-lg max-w-xl">
        <img :src="userData.profilePicture || 'ruta/a/imagen/placeholder.png'" 
             alt="Foto de perfil"
             class="w-32 h-32 rounded-full mx-auto mb-4" />
  
        <div class="text-center mx-auto">
          <h2 class="text-xl font-bold mb-3">{{ editing ? 'Editando perfil de ' + userData.username : userData.username }}</h2>
          <p v-if="!editing" class="text-gray-600 mb-6">{{ userData.email }}</p>
          <p v-if="!editing" class="text-gray-500 mb-6">{{ userData.address }}</p>
  
          <div v-if="!editing" class="password-section m-auto mb-6 text-center items-center">
            <input :value="displayedPassword" readonly class="border bg-gray-100 px-3 py-2 rounded" />
            <button @click="togglePasswordVisibility" class="ml-2 text-blue-500">
              {{ isPasswordShown ? "Ocultar" : "Ver" }}
            </button>
          </div>
  
          <!-- Campos editables -->
          <div v-if="editing" class="space-y-4">
            <label class="mb-3">Nombre de Usuario</label>
            <input v-model="userData.username" class="block w-full border p-2 rounded mb-3"/>
  
            <label class="mb-3">Correo Electrónico</label>
            <input v-model="userData.email" class="block w-full border p-2 rounded mb-3"/>
  
            <label class="mb-3">Dirección</label>
            <input v-model="userData.address" class="block w-full border p-2 rounded mb-3"/>
  
            <label class="mb-3">Contraseña</label>
            <div class="relative">
  <input :type="isPasswordShown ? 'text' : 'password'" v-model="userData.password" placeholder="Contraseña" class="block w-full border p-2 rounded pr-10 mb-3" />
  <button @click="togglePasswordVisibility" class="absolute inset-y-0 right-2 text-blue-500">
    {{ isPasswordShown ? "Ocultar" : "Ver" }}
  </button>
</div>
          </div>
  
          <!-- Botones -->
          <div v-if="!editing" class="mt-4">
            <button @click="editing = true" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Editar</button>
          </div>
  
          <div v-if="editing" class="mt-4 space-x-2">
            <button @click="saveProfile" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Guardar</button>
            <button @click="editing = false" class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
import axios from "axios";

export default {
  data() {
    return {
      username: localStorage.getItem("loggedInUsername"), // Recuperar el nombre de usuario del localStorage
      userData: {},
      isPasswordShown: false,
      editing: false,
      originalData: null
    };
  },
  
  computed: {
    displayedPassword() {
      return this.isPasswordShown ? this.userData.password : "*****";
    }
  },
  
  methods: {
    togglePasswordVisibility() {
      this.isPasswordShown = !this.isPasswordShown;
    },
    
    async fetchUserProfile() {
      if (!this.username) {
        console.error("Usuario no identificado.");
        return; // Salir de la función si no hay un nombre de usuario.
      }

      try {
        const response = await axios.get(`http://localhost:3333/users/profile/${this.username}`);
        this.userData = response.data;
      } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
      }
    },
    
    async saveProfile() {
      try {
        await axios.put(`http://localhost:3333/users/profile/${this.userData._id}`, this.userData);
        console.log('Perfil actualizado exitosamente');
         this.editing = false; 
      } catch (error) {
        console.error('Error al actualizar perfil:', error);
      }
    },

  },
  
  mounted() {
    this.fetchUserProfile();
  }
};
</script>


<style scoped>
.profile-card {
  min-width: 600px;
  min-height: 500px;
}
</style>
