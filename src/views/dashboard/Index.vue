<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import VerticalLayoutVue from "../../Layouts/VerticalLayout.vue";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
const router = useRouter();

if (!user.value) {
  router.push({ name: "login" });
}

watch(
  () => user.value,
  () => {
    if (!user.value) {
      router.push({ name: "login" });
    }
  }
);
</script>
<template>
  <VerticalLayoutVue />
</template>
