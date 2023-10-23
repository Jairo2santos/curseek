<template>
    <div class="flex justify-center items-center h-screen bg-gray-200">
      <form class="bg-white p-6 rounded-lg shadow-lg max-w-screen-md w-full" style="max-width: 800px;" @submit.prevent="registerUser">
        <h2 class="text-xl font-bold mb-4 text-center">Regístrate</h2>
        
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-600">Nombre de Usuario</label>
          <input type="text" id="username" v-model="username" placeholder="Nombre de Usuario" class="mt-1 p-2 w-full border rounded-md" required />
        </div>
        
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-600">Email</label>
          <input type="email" id="email" v-model="email" placeholder="Email" class="mt-1 p-2 w-full border rounded-md" required />
        </div>
        
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-600">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Contraseña" class="mt-1 p-2 w-full border rounded-md" required />
        </div>
        
        <div class="mb-4">
          <label for="confirmPassword" class="block text-sm font-medium text-gray-600">Confirmar Contraseña</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Confirmar Contraseña" class="mt-1 p-2 w-full border rounded-md" required />
          <p v-if="passwordsDoNotMatch" class="text-sm text-red-500 mt-1">Las contraseñas no coinciden.</p>
        </div>

        <div class="mb-4">
          <label for="address" class="block text-sm font-medium text-gray-600">Dirección</label>
          <textarea id="address" v-model="address" placeholder="Dirección" class="mt-1 p-2 w-full border rounded-md h-24"></textarea>
        </div>

        <div class="mb-4">
          <label for="profilePicture" class="block text-sm font-medium text-gray-600">Link de Imagen</label>
          <input type="text" id="profilePicture" v-model="profilePicture" placeholder="URL de tu imagen" class="mt-1 p-2 w-full border rounded-md" />
        </div>

        <button type="submit" class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Registrarse</button>
      </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      profilePicture: "",
      passwordsDoNotMatch: false
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.passwordsDoNotMatch = true;
        return;
      }
      this.passwordsDoNotMatch = false; 
      try {
        await axios.post("http://localhost:3333/users/register", {
          username: this.username,
          email: this.email,
          password: this.password,
          address: this.address,
          profilePicture: this.profilePicture
        });
        this.$router.push("/login");
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
      }
    },
  },
};
</script>
