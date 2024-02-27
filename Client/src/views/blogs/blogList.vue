<template>
  <div class="bg-pastel-fucsia min-h-screen p-5">
    <!-- Botón para agregar un nuevo blog solo si es admin -->
    <div v-if="isAdmin" class="text-right mb-4">
      <router-link to="/blog/new" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Agregar nuevo blog</router-link>
    </div>

    <div v-if="blogs.length" class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- Itera sobre el array de blogs -->
      <div v-for="blog in blogs" :key="blog._id" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <!-- Imagen -->
        <router-link :to="{ name: 'BlogDetail', params: { blogId: blog._id } }">
          <img :src="blog.image" alt="Imagen del Blog" class="w-full h-48 object-cover">
        </router-link>
        <!-- Contenido -->
        <div class="p-4">
          <router-link :to="{ name: 'BlogDetail', params: { blogId: blog._id } }">
            <h2 class="text-2xl font-bold text-pastel-verde mb-2">{{ blog.title }}</h2>
          </router-link>
          <p class="text-gray-700 text-base mb-4">{{ blog.content.substring(0, 150) + "..." }}</p>
          <div class="text-pastel-fucsia text-sm">
            Publicado el {{ new Date(blog.date).toLocaleDateString() }}
          </div>
          <!-- Botones de administrador para editar y eliminar -->
          <div v-if="isAdmin" class="admin-buttons flex space-x-2 mt-4">
            <router-link :to="{ name: 'EditBlog', params: { blogId: blog._id } }" class="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Editar</router-link>
            <button @click="deleteBlog(blog._id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center">
      <p>Cargando blogs...</p>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const blogs = ref([]);
const router = useRouter();
const isAdmin = localStorage.getItem('userRole') === 'admin'; // Verifica si el usuario es admin

// Función para eliminar un blog
const deleteBlog = async (blogId) => {
  if (!confirm('¿Estás seguro de que deseas eliminar este blog?')) return;
  try {
    await axios.delete(`http://localhost:3333/blogs/${blogId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Asume que el token JWT está guardado en localStorage
      }
    });
    // Filtra el blog eliminado de la lista
    blogs.value = blogs.value.filter(blog => blog._id !== blogId);
  } catch (error) {
    console.error('Error al eliminar el blog:', error);
  }
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3333/blogs');
    blogs.value = response.data;
  } catch (error) {
    console.error('Error al cargar los blogs:', error);
  }
});
</script>

