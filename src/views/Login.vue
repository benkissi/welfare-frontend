<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const { userToken, loading, companyInfo } = storeToRefs(authStore);

const state = reactive({
  email: "",
  password: "",
});

const rules = {
  email: { required, email },
  password: { required },
};

const v$ = useVuelidate(rules, state);
const submitted = ref(false);

const handleSubmit = (isFormValid) => {
  submitted.value = true;

  if (!isFormValid) {
    return;
  }

  authStore.loginUser(state.email, state.password);
};

// const resetForm = () => {
//   state.email = "";
//   state.password = "";
// };

watchEffect(() => {
  if (userToken.value && companyInfo.value) {
    router.push({ name: "home" });
  }

  if (userToken.value && !companyInfo.value) {
    router.push({ name: "companyInfoStep" });
  }
});
</script>
<template>
  <div class="grid grid-cols-12 h-full w-full">
    <div
      class="flex items-center justify-center col-span-4 h-full bg-indigo-500 p-8"
    >
      <div>Login</div>
    </div>
    <div
      class="flex flex-col items-center justify-center col-span-8 h-full place-content-center p-8"
    >
      <div class="mb-10 text-2xl font-bold">Login</div>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid w-1/2">
        <!-- Email -->
        <div class="field mb-6">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PInputText
              id="email"
              v-model="v$.email.$model"
              :class="{ 'p-invalid': v$.email.$invalid && submitted }"
              aria-describedby="email-error"
            />
            <label
              for="email"
              :class="{ 'p-error': v$.email.$invalid && submitted }"
              >Email*</label
            >
          </div>
          <span v-if="v$.email.$error && submitted">
            <span
              id="email-error"
              v-for="(error, index) of v$.email.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.email.$invalid && submitted) || v$.email.$pending.$response
            "
            class="p-error"
            >{{ v$.email.required.$message.replace("Value", "Email") }}</small
          >
        </div>

        <!-- Password -->
        <div class="field mb-6">
          <div class="p-float-label">
            <PPassword
              id="password"
              :feedback="false"
              v-model="v$.password.$model"
              :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            />
            <label
              for="password"
              :class="{ 'p-error': v$.password.$invalid && submitted }"
              >Password*</label
            >
          </div>
          <small
            v-if="
              (v$.password.$invalid && submitted) ||
              v$.password.$pending.$response
            "
            class="p-error"
            >{{
              v$.password.required.$message.replace("Value", "Password")
            }}</small
          >
        </div>
        <PButton
          :loading="loading"
          label="Submit"
          type="submit"
          class="mt-5 bg-indigo-500 hover:!bg-indigo-600 border-indigo-500 hover:border-indigo-500"
        />
      </form>
    </div>
  </div>
</template>
