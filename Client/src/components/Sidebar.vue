<template>
  <div>
    <!-- Botón del menú hamburguesa -->
    <button @click="toggleMenu" class="md:hidden">
      <!-- Icono de hamburguesa SVG -->
      <span class="flex ml-2 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
          <path d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z"/>
        </svg>
      </span>
    </button>

    <!-- Contenido del Sidebar (Modal) -->
    <transition name="modal" v-if="isMenuOpen">
      <div class="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div class="p-6 border-r bg-white border-gray-200 rounded-lg md:max-w-md lg:max-w-lg relative">
          <button @click="toggleMenu" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
            <!-- Icono de cerrar SVG -->
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59 7.12 5.7a1 1 0 1 0-1.42 1.42L10.59 12 5.7 16.88a1 1 0 0 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"/>
            </svg>
          </button>
          <ul>
            <li
              v-for="category in categories"
              :key="category"
              class="my-1 hover:bg-gray-100 rounded-lg p-2"
            >
              <div class="flex items-center">
                <input
                  type="radio"
                  name="categoryFilter"
                  class="hidden"
                  :id="category"
                  v-model="selectedCategories"
                  :value="category"
                />
                <label :for="category" class="flex items-center cursor-pointer w-full">
                  <span
                    class="w-5 h-5 inline-block mr-2 rounded-full border border-gray-400 flex-shrink-0"
                    :class="{'bg-blue-500': selectedCategories.includes(category)}"
                  ></span>
                  {{ category }}
                </label>
              </div>
            </li>
          </ul>

          <!-- Botón "Aplicar cambios" -->
          <button @click="applyChanges" class="bg-blue-500 text-white p-2 rounded-lg mt-4">
            Aplicar cambios
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['filter-by-category']);
const selectedCategories = ref([]);
const isMenuOpen = ref(false);

watch(selectedCategories, (newVal) => {
  // Emitir el valor como un array para mantener compatibilidad con el código anterior
  emit('filter-by-category', [newVal]);
});

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Transición del modal */
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
}
</style>
