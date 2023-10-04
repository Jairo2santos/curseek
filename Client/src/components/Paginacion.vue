<template>
  <div class="flex justify-center my-4">
    <button
      @click="prevPage"
      :disabled="currentPage <= 1"
      class="mx-1 px-4 py-2 border rounded-lg bg-gray-200"
    >
      Anterior
    </button>

    <span v-if="currentPage > 3" class="mx-1">...</span>

    <div v-for="page in displayedPages" :key="page" class="mx-1">
      <button
        @click="changePage(page)"
        :class="
          page === currentPage
            ? 'text-white bg-blue-500'
            : 'text-black bg-gray-200'
        "
        class="px-4 py-2 border rounded-lg"
      >
        {{ page }}
      </button>
    </div>

    <span v-if="currentPage < totalPages - 2" class="mx-1">...</span>
    <button
      @click="changePage(totalPages)"
      :class="
        currentPage === totalPages
          ? 'text-white bg-blue-500'
          : 'text-black hover:bg-gray-500 bg-gray-400'
      "
      class="mx-1 px-4 py-2 border rounded-lg"
    >
      {{ totalPages }}
    </button>

    <button
      @click="nextPage"
      :disabled="currentPage >= totalPages"
      class="mx-1 px-4 py-2 border rounded-lg bg-gray-200"
    >
      Siguiente
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  computed: {
    startPage() {
      if (this.currentPage <= 3) return 1;
      if (this.currentPage > this.totalPages - 2) return this.totalPages - 4;
      return this.currentPage - 2;
    },
    endPage() {
      if (this.currentPage <= 3) return 5;
      if (this.currentPage > this.totalPages - 2) return this.totalPages;
      return this.currentPage + 2;
    },
    displayedPages() {
      let pages = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      this.$emit("changePage", page);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.$emit("changePage", this.currentPage + 1);
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.$emit("changePage", this.currentPage - 1);
      }
    },
  },
};
</script>
