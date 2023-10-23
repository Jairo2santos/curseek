<template>
  <div class="text-right">
    <select
      v-model="selectedFilter"
      @change="applyFilter"
      class="bg-gray-300 p-2 rounded-md">
      <option class="bg-white" value="dateDesc">Más Reciente</option>
      <option class="bg-white" value="priceAsc">Menor precio</option>
      <option class="bg-white" value="priceDesc">Mayor precio</option>
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
};
</script>
