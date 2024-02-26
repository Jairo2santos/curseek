<template>
  <div class="flex flex-wrap justify-center my-5 space-x-2">
    <button @click="prevPage" :disabled="currentPage <= 1" class="p-2 cursor-pointer border rounded-full bg-white border-gray-300 hover:border-indigo-600 transition">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-267.692 347.692-480 560-692.308 588.308-664l-184 184 184 184L560-267.692Z"/></svg>
    </button>
    <span v-if="currentPage > 3" class="mx-1 hidden lg:inline">...</span>
    <div v-for="page in displayedPages" :key="page" class="mx-1">
      <button @click="changePage(page)" :class="page === currentPage
          ? 'text-white bg-indigo-600'
          : 'text-black bg-white'
        " class="px-4 py-2 border rounded-full border-gray-300 hover:border-indigo-600 transition">
        {{ page }}
      </button>
    </div>
    <span v-if="currentPage < totalPages - 2" class="mx-1 hidden lg:inline">...</span>
    <button @click="changePage(totalPages)" :class="currentPage === totalPages
        ? 'text-white bg-indigo-600'
        : 'text-black  bg-gray-200 border-gray-300 hover:border-indigo-600 transition'
      " class="mx-1 px-4 py-2 border rounded-full border-gray-300">
      {{ totalPages }}
    </button>
    <button @click="nextPage" :disabled="currentPage >= totalPages" class="p-2 border rounded-full bg-white border-gray-300 hover:border-indigo-600 transition">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m531.692-480-184-184L376-692.308 588.308-480 376-267.692 347.692-296l184-184Z"/></svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['changePage']);

const startPage = computed(() => {
  if (props.currentPage <= 3) return 1;
  if (props.currentPage > props.totalPages - 2) return props.totalPages - 4;
  return props.currentPage - 2;
});

const endPage = computed(() => {
  if (props.currentPage <= 3) return 5;
  if (props.currentPage > props.totalPages - 2) return props.totalPages;
  return props.currentPage + 2;
});

const displayedPages = computed(() => {
  let pages = [];
  for (let i = startPage.value; i <= endPage.value; i++) {
    pages.push(i);
  }
  return pages;
});

const changePage = (page) => {
  emit("changePage", page);
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit("changePage", props.currentPage + 1);
  }
};

const prevPage = () => {
  if (props.currentPage > 1) {
    emit("changePage", props.currentPage - 1);
  }
};
</script>