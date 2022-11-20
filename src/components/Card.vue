<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="w-full h-full bg-white rounded drop-shadow-xl">
    <div :class="noPadding ? 'p-0' : 'p-5'">
      <slot></slot>
    </div>
  </div>
</template>
