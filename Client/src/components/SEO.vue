<template>  
    <nav aria-label="breadcrumb" v-if="breadcrumbs.length > 1" class="text-xs md:py-4">
      <ol class="flex flex-wrap list-none pl-0 mb-0">
        <li v-for="(crumb, index) in breadcrumbs" :key="index" class="flex items-center">
          <router-link v-if="!crumb.active" :to="crumb.to" class="text-indigo-600 hover:underline font-medium py-1 px-2 duration-200 ease-in-out">
            {{ crumb.text }}
          </router-link>
          <span v-else class="text-gray-500 py-1 px-2">
            {{ crumb.text }}
          </span>
          <span v-if="index < breadcrumbs.length - 1" class="text-indigo-600 font-medium text-xs py-1 px-2">/</span>
        </li>
      </ol>
    </nav>
  </template>
  

  <script setup>
  import { computed, defineProps } from 'vue';
  import { useHead } from '@vueuse/head';
  
  // Recibe las propiedades del componente padre
  const props = defineProps({
    title: String,
    description: String,
    breadcrumbs: Array,
  });
  
  // Se genera el string JSON-LD
  const jsonLdString = computed(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": props.breadcrumbs.map((breadcrumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": breadcrumb.text,
      "item": breadcrumb.to,
    })),
  }));
  
  // Uso de useHead para inyectar dinámicamente el título, descripción y JSON-LD
  useHead({
    title: props.title,
    meta: [
      {
        name: 'description',
        content: props.description,
      },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: jsonLdString.value,
        key: 'breadcrumb-json-ld', // Proporcionar una clave única para la deduplicación
      }
    ]
  });
  </script>
<style scoped>
@media (min-width: 640px) {
  .breadcrumb li a,
  .breadcrumb li span {
    padding-left: 8px;
    padding-right: 8px;
  }
}
</style>