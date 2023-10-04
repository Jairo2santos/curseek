<!-- AppHeader.vue -->
<template>
    <div class="bg-purple-700 text-white shadow-md">
      <div class="container mx-auto px-4 py-2">
        <div class="flex items-center justify-between">
          <div class="text-xl font-semibold">Curseek</div>
          <nav class="space-x-4">
            <router-link to="/" class="hover:bg-purple-800 px-3 py-1 rounded transition">Home</router-link>
            <router-link to="/cursos" class="hover:bg-purple-800 px-3 py-1 rounded transition">UTN</router-link>
          </nav>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AppHeader"
  };
  </script>