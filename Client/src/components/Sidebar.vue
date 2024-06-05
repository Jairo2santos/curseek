<template>
  <div>
    <div class="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="22">
        <path
          d="M440-120v-240h80v80h320v80H520v80h-80Zm-320-80v-80h240v80H120Zm160-160v-80H120v-80h160v-80h80v240h-80Zm160-80v-80h400v80H440Zm160-160v-240h80v80h160v80H680v80h-80Zm-480-80v-80h400v80H120Z" />
      </svg>
      <span class="font-semibold ml-2 text-sm">Filtrar por</span>
      <button v-if="selectedCategories.length > 0" @click="clearSelectedCategory"
        class="ml-auto text-sm bg-gray-200 text-blue-700 font-semibold px-2 rounded-full">
        Limpiar todo
      </button>
    </div>
    <div class="md:text-md bg-white md:max-w-md lg:max-w-lg rounded-t-md">
      <div class="">
        <button @click="dropdownOpen1 = !dropdownOpen1"
          class="w-full pl-3 px-60 py-2 text-left sm:text-md font-semibold relative">
          <span>Categoría</span>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="h-5 w-5 text-gray-400 transform transition-transform duration-300"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
              :class="{ 'rotate-180': dropdownOpen1 }">
              <path fill-rule="evenodd"
                d="M3.293 7.293a1 1 0 0 1 1.414 0L10 12.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>

        <div v-show="dropdownOpen1"
          class="origin-top-right  w-full bg-white ring-1 ring-transparent ring-opacity-5 md:text-md md:max-w-md lg:max-w-lg">
          <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div v-for="category in categories" :key="category">
              <label class="flex cursor-pointer hover:bg-gray-100 transition p-2 items-center py-1">
                <input type="radio" v-model="selectedCategories" :value="category"
                  class="form-radio h-4 w-4 transition duration-150 ease-in-out" />
                <span class="ml-2 text-sm text-gray-900">{{ capitalize(category) }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(['filter-by-category']);
const selectedCategories = ref([]);
const clearSelectedCategory = () => {
  selectedCategories.value = [];
};

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

watch(selectedCategories, (newVal) => {
  emit('filter-by-category', [newVal]);
  console.log('Emitiendo evento con categoría:', newVal);
});

let dropdownOpen1 = ref(true);
</script>
