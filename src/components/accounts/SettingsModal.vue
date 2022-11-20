<script setup>
import { watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import { useAccountsStore } from "../../stores/accountsStore";

const emit = defineEmits(["close"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
});

const toast = useToast();
const accountStore = useAccountsStore();
const { changingStatus } = storeToRefs(accountStore);

const showModal = ref(props.show);
const accountActive = ref(props.isActive);

const handleStatusChange = async (value) => {
  console.log("event---", value);
  const res = await accountStore.changeAccountStatus(value, props.id);

  if (res.success) {
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Status Updated",
      life: 3000,
    });
    await accountStore.fetchAccountDetails(props.id);
  } else {
    console.log("error", res);
  }
};

watch(
  () => props.show,
  (newValue) => {
    showModal.value = newValue;
  }
);

watch(
  () => props.isActive,
  (newValue) => {
    accountActive.value = newValue;
  }
);
</script>

<template>
  <PSidebar
    v-model:visible="showModal"
    :baseZIndex="10000"
    position="right"
    @hide="emit('close')"
  >
    <div class="mt-5">
      <div class="flex justify-between w-full">
        <div
          class="text-lg"
          :class="[accountActive ? 'text-green-600' : 'text-red-600']"
        >
          {{ accountActive ? "Account is active" : "Account is In-active" }}
        </div>
        <PSpinner
          v-if="changingStatus"
          style="width: 40px; height: 50px"
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
        <PInputSwitch
          v-else
          v-model="accountActive"
          @input="handleStatusChange"
        />
      </div>
    </div>
  </PSidebar>
</template>
