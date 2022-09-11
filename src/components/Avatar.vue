<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
  text: {
    type: String,
    default: "Ben Kissi",
  },
});
</script>
<template>
  <div class="flex items-center">
    <div class="text-gray-500 mr-2">{{ text }}</div>
    <div class="w-12 h-12 bg-slate-400 rounded-full"></div>
  </div>
</template>
