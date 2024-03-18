<<<<<<< HEAD
<!-- Filtros.vue -->
<template>
  <div>
    <select v-model="selectedFilter" @change="applyFilter"
      class="px-4 py-2 border rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
      <option value="priceAsc">Precio: Menor a Mayor</option>
      <option value="priceDesc">Precio: Mayor a Menor</option>
      <option value="dateDesc">Fecha: Más Reciente</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilter: "priceAsc" // Por defecto, seleccionamos el filtro "Precio: Menor a Mayor".
    };
  },
  methods: {
    applyFilter() {
      this.$emit('filter-changed', this.selectedFilter);
      console.log("Emite el filtro:", this.selectedFilter);

    }
  }
}
=======
<template>
  <div class="text-right">
    <select v-model="selectedFilter" @change="applyFilter"
      class="bg-gray-300 cursor-pointer text-black transition px-2 py-1 rounded-md text-sm font-semibold">
      <option class="bg-white text-black" value="dateDesc">Más Reciente</option>
      <option class="bg-white text-black" value="priceAsc">Menor precio</option>
      <option class="bg-white text-black" value="priceDesc">Mayor precio</option>
    </select>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const selectedFilter = ref("priceAsc");
const emits = defineEmits(["filter-changed"]);
const applyFilter = () => {
  emits('filter-changed', selectedFilter.value);
  console.log("Emite el filtro:", selectedFilter.value);
};
>>>>>>> developer
</script>