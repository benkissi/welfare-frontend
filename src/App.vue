<script setup>
import { storeToRefs } from "pinia";
import { useAuthStore } from "./stores/authStore";
import { RouterView } from "vue-router";

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

if (user.value?._id) {
  authStore.fetchUserCompany(user.value._id);
}
</script>

<template>
  <PToast />
  <RouterView />
</template>

<style scoped></style>
