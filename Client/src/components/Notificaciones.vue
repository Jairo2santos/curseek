<template>
    <transition name="slide-down">
      <div v-if="visible" :class="`fixed top-0 inset-x-0 z-50 text-white text-center py-3 ${backgroundColor}`">
        {{ message }}
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3" @click="close">
          <svg class="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Cerrar</title>
            <path d="M14.348 14.849a.5.5 0 0 1-.708 0L10 11.207l-3.65 3.65a.5.5 0 0 1-.707-.708l3.65-3.65-3.65-3.65a.5.5 0 1 1 .707-.708l3.65 3.65 3.65-3.65a.5.5 0 0 1 .708.708L10.707 10l3.65 3.65a.5.5 0 0 1 0 .708z"/>
          </svg>
        </span>
      </div>
    </transition>
  </template>
  
<script setup>
import { ref, computed} from 'vue';

const props = defineProps({
  message: String,
  type: String
});

const emits = defineEmits(['close']);

const visible = ref(true);

const backgroundColor = computed(() => {
  return props.type === 'error' ? 'bg-red-500' : 'bg-green-500';
});

function close() {
  visible.value = false;
  emits('close');
}
</script>
  