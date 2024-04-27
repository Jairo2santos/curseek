<template>
<div class="flex items-center justify-center my-5 space-x-1 sm:space-x-2">
  <a href="#" @click.prevent="prevPage"
   :class="{ 'cursor-not-allowed opacity-50': currentPage <= 1 }"
   class="hidden sm:flex p-1 sm:p-2 border rounded-lg bg-white border-gray-300 hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
   :rel="currentPage > 1 ? 'prev' : null">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-267.692 347.692-480 560-692.308 588.308-664l-184 184 184 184L560-267.692Z"/></svg>
  </a>

  <span v-if="currentPage > 3" class="mx-1 hidden lg:inline">...</span>
  <div v-for="page in displayedPages" :key="page" class="mx-1">
    <a href="#" @click.prevent="changePage(page)" 
       :class="[page === currentPage ? 'text-white bg-indigo-600 shadow' : 'text-gray-700 bg-white', 'block w-8 h-8 leading-8 text-center rounded-lg transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:text-white']">
      {{ page }}
    </a>
  </div>

  <span v-if="currentPage < totalPages - 2" class="mx-1 hidden lg:inline">...</span>

  <div class="flex items-center justify-center w-8 h-8 leading-8 text-center rounded-lg bg-gray-200">
    <a href="#" @click.prevent="changePage(totalPages)" 
       :class="[currentPage === totalPages ? 'text-white' : 'text-gray-700', 'transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:text-white']">
    {{ totalPages }}
  </a>
  </div>

  <a href="#" @click.prevent="nextPage"
   :class="{ 'cursor-not-allowed opacity-50': currentPage >= totalPages }"
   class="hidden sm:flex p-1 sm:p-2 border rounded-lg bg-white border-gray-300 hover:shadow-md transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
   :rel="currentPage < totalPages ? 'next' : null">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z"/></svg>
  </a>
</div>

</template>

<script setup>
import { computed } from 'vue';
import { defineProps, defineEmits } from 'vue';


const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: Number,
  totalPages: Number,
});


const emit = defineEmits(['changePage']);


// Calcula las páginas que se deben mostrar
const displayedPages = computed(() => {
  if (props.totalPages <= 3) {
    return Array.from({ length: props.totalPages }, (_, i) => i + 1);
  }

  const pages = [];
  pages.push(props.currentPage);

  let prevPage = props.currentPage - 1;
  let nextPage = props.currentPage + 1;

  if (prevPage > 1) pages.unshift(prevPage);
  if (nextPage < props.totalPages) pages.push(nextPage);

  if (prevPage > 2) pages.unshift(1);
  if (nextPage < props.totalPages - 1) pages.push(props.totalPages);

  return pages;
});



const changePage = (page) => {
  emit('pageChange', page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    changePage(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    changePage(props.currentPage + 1);
  }
};
</script>