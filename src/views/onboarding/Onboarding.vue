<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref } from "vue";

const steps = ref([
  {
    label: "Company Information",
    to: "/onboarding/company-information",
  },
  {
    label: "Invite Managers",
    to: "/onboarding/invite-managers",
  },
]);
</script>
<template>
  <div class="flex flex-col items-center justify-center w-full h-full bg-white">
    <div class="card w-1/2">
      <PSteps :model="steps" class="" />
    </div>

    <PCard class="w-1/2 min-h-4/6 mt-11">
      <template #content>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </template>
    </PCard>
  </div>
</template>

<style scoped>
:deep(.p-menuitem-link) {
  background-color: transparent !important;
}

:deep(.p-card-body) {
  height: 100%;
}

:deep(.p-card-content) {
  height: 100%;
}
</style>
