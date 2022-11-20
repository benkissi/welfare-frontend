<script setup>
import { ref, watch, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";

import { useAccountsStore } from "../../stores/accountsStore";
import { useAuthStore } from "../../stores/authStore";
import { sourcesList } from "../../utils/methods";
import { useToast } from "primevue/usetoast";
import GIcons from "../GIcons.vue";

const emit = defineEmits(["close"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  transactionType: {
    type: String,
    default: "Contribution",
  },
  id: {
    type: String,
  },
});

const toast = useToast();
const accountStore = useAccountsStore();
const authStore = useAuthStore();
const { currentAccount, addingContribution, addingRedrawal } =
  storeToRefs(accountStore);
const { user } = storeToRefs(authStore);

const showModal = ref(props.show);
const submitted = ref(false);

const formValues = reactive({
  amount: null,
  paymentSource: currentAccount.value?.deductionSource || null,
});

const rules = {
  amount: { required },
  paymentSource: {},
};

const v$ = useVuelidate(rules, formValues);

const handleSubmit = async (valid) => {
  submitted.value = true;

  if (!valid) {
    return;
  }

  const payload = {
    amount: formValues.amount,
    memberId: currentAccount.value.memberId,
    member: props.id,
    operator: user.value._id,
    paymentSource: formValues.paymentSource,
  };

  console.log("payload", payload);
  let res;

  if (props.transactionType === "Contribution") {
    res = await accountStore.addContribution(payload);
  } else {
    res = await accountStore.addRedrawal(payload);
  }
  if (res.success) {
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Transaction added successfully",
      life: 3000,
    });
    await accountStore.fetchAccountDetails(props.id);
    await accountStore.fetchContributions(props.id);
    await accountStore.fetchRedrawals(props.id);
    emit("close");
  }
};

watch(
  () => props.show,
  (newValue) => {
    showModal.value = newValue;
  }
);

watch(
  () => currentAccount.value,
  (newValue) => {
    if (!newValue) return;
    formValues.paymentSource = newValue?.deductionSource;
  }
);
</script>

<template>
  <PDialog
    v-model:visible="showModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    @hide="emit('close')"
    :header="'Add ' + transactionType"
  >
    <div>
      <div class="text">
        Member: <span>{{ currentAccount.memberId }}</span>
      </div>
      <form class="p-fluid w-full mt-5 mb-5">
        <div class="grid grid-cols-2 gap-10 items-start">
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Amount</div>
              <PInputNumber
                id="amount"
                v-model="v$.amount.$model"
                :class="{
                  'p-invalid': v$.amount.$invalid && submitted,
                }"
                aria-describedby="amount-error"
                mode="currency"
                currency="GHS"
              />
            </div>
            <span v-if="v$.amount.$error && submitted">
              <span
                id="amount-error"
                v-for="(error, index) of v$.amount.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.amount.$invalid && submitted) ||
                v$.amount.$pending.$response
              "
              class="p-error"
              >{{
                v$.amount.required.$message.replace("Value", "Amount")
              }}</small
            >
          </div>
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="flex items-end mb-3 text-black font-medium text-sm">
                <div>Payment Source</div>
                <div
                  class="flex items-end ml-1 relative"
                  v-tooltip.right="{
                    value: 'Default source is pre-selected but can be changed.',
                    class: 'zIndex',
                  }"
                >
                  <GIcons name="help" class="text-slate-400" />
                </div>
              </div>
              <PDropdown
                :options="sourcesList"
                v-model="v$.paymentSource.$model"
              />
            </div>

            <span v-if="v$.paymentSource.$error && submitted">
              <span
                id="amount-error"
                v-for="(error, index) of v$.paymentSource.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.paymentSource.$invalid && submitted) ||
                v$.paymentSource.$pending.$response
              "
              class="p-error"
              >{{
                v$.paymentSource.required.$message.replace(
                  "Value",
                  "Payment source"
                )
              }}</small
            >
          </div>
        </div>
        <div class="grid grid-cols-4 mt-5">
          <PButton
            class="button-success"
            label="Submit"
            @click="handleSubmit(!v$.$invalid)"
            :loading="addingContribution || addingRedrawal"
          />
        </div>
      </form>
    </div>
  </PDialog>
</template>

<style>
.zIndex {
  z-index: 1200;
}
</style>
