<!-- Filtros.vue -->

<template>
 <div>
  <select v-model="selectedFilter" @change="applyFilter" class="px-4 py-2 border rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
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
  </script>
  