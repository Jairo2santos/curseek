<template>
    <div class="p-4 border-r bg-gray-50 border-gray-200 rounded-lg md:max-w-md lg:max-w-lg">
      <h2 class="text-xl font-bold mb-4">Filtrar por categoría</h2>
      <ul>
        <li v-for="category in categories" :key="category" class="my-2 hover:bg-gray-200 rounded-lg p-2">
          <div class="flex items-center">
            <input type="radio" name="categoryFilter" class="hidden" :id="category" v-model="selectedCategories" :value="category" />
            <label :for="category" class="flex items-center cursor-pointer w-full">
              <span class="w-5 h-5 inline-block mr-2 rounded-full border border-gray-400 flex-shrink-0" :class="{'bg-blue-500': selectedCategories.includes(category)}"></span>
              {{ category }}
            </label>
          </div>
        </li>
      </ul>
    </div>
  </template>
  <script>
  export default {
    props: {
      categories: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        selectedCategories: '',
      };
    },
    watch: {
      selectedCategories() {
        // Emitimos el valor como un array para mantener compatibilidad con el código anterior
        this.$emit('filter-by-category', [this.selectedCategories]);
        console.log('Emitiendo evento con categoría:', this.selectedCategories);
      },
    },
  };
  </script>
  