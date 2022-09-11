<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { reactive, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { useToast } from "primevue/usetoast";
import { email, required } from "@vuelidate/validators";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const toast = useToast();

const { userToken, loading, user } = storeToRefs(authStore);

const passwordIsSame = (password) => {
  return password === state.password;
};

const state = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const rules = {
  firstName: { required },
  lastName: { required },
  email: { required, email },
  password: { required },
  repeatPassword: { sameAsPassword: passwordIsSame },
};

const v$ = useVuelidate(rules, state);
const submitted = ref(false);

const handleSubmit = (isFormValid) => {
  submitted.value = true;
  console.log("fields", v$);
  if (!isFormValid) {
    return;
  }

  authStore.signUpUser({
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
    password: state.password,
  });
};

// const resetForm = () => {
//   state.email = "";
//   state.password = "";
// };

watchEffect(() => {
  if (userToken.value) {
    router.push({ name: "home" });
  }
  console.log("user", userToken.value);
  if (user.value && !userToken.value) {
    console.log("user--90", userToken.value);
    toast.add({
      severity: "success",
      summary: "Sign up was successful",
      detail: "Please sign in",
      life: 5000,
    });
    router.push({ name: "login" });
  }
});
</script>
<template>
  <div class="grid grid-cols-12 h-full w-full">
    <div
      class="flex items-center justify-center col-span-4 h-full bg-indigo-500 p-8"
    >
      <div>Sign up</div>
    </div>
    <div
      class="flex flex-col items-center justify-center col-span-8 h-full place-content-center p-8"
    >
      <div class="mb-10 text-2xl font-bold">Sign Up</div>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid w-1/2">
        <!-- First name -->
        <div class="field mb-6">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PInputText
              id="firstName"
              v-model="v$.firstName.$model"
              :class="{ 'p-invalid': v$.firstName.$invalid && submitted }"
              aria-describedby="firstName-error"
            />
            <label
              for="firstName"
              :class="{ 'p-error': v$.firstName.$invalid && submitted }"
              >First Name*</label
            >
          </div>
          <span v-if="v$.firstName.$error && submitted">
            <span
              id="firstName-error"
              v-for="(error, index) of v$.firstName.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.firstName.$invalid && submitted) ||
              v$.firstName.$pending.$response
            "
            class="p-error"
            >{{
              v$.firstName.required.$message.replace("Value", "First name")
            }}</small
          >
        </div>

        <!-- Last name -->
        <div class="field mb-6">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PInputText
              id="lastName"
              v-model="v$.lastName.$model"
              :class="{ 'p-invalid': v$.lastName.$invalid && submitted }"
              aria-describedby="lastName-error"
            />
            <label
              for="lastName"
              :class="{ 'p-error': v$.lastName.$invalid && submitted }"
              >Last Name*</label
            >
          </div>
          <span v-if="v$.lastName.$error && submitted">
            <span
              id="lastName-error"
              v-for="(error, index) of v$.lastName.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.lastName.$invalid && submitted) ||
              v$.lastName.$pending.$response
            "
            class="p-error"
            >{{
              v$.lastName.required.$message.replace("Value", "Last name")
            }}</small
          >
        </div>

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
              toggleMask
              id="password"
              v-model="v$.password.$model"
              :class="{ 'p-invalid': v$.password.$invalid && submitted }"
            >
              <template #header>
                <h6>Pick a password</h6>
              </template>
              <template #footer="sp">
                {{ sp.level }}
                <PDivider />
                <p class="mt-2">Suggestions</p>
                <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                  <li>At least one lowercase</li>
                  <li>At least one uppercase</li>
                  <li>At least one numeric</li>
                  <li>Minimum 8 characters</li>
                </ul>
              </template>
            </PPassword>
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

        <!-- Repeat Password -->
        <div class="field mb-6">
          <div class="p-float-label">
            <PPassword
              toggleMask
              id="repeat-password"
              :feedback="false"
              v-model="v$.repeatPassword.$model"
              :class="{ 'p-invalid': v$.repeatPassword.$invalid && submitted }"
            />
            <label
              for="repeat-password"
              :class="{ 'p-error': v$.repeatPassword.$invalid && submitted }"
              >Repeat Password*</label
            >
          </div>
          <small
            v-if="
              (v$.repeatPassword.$invalid && submitted) ||
              v$.repeatPassword.$pending.$response
            "
            class="p-error"
            >{{
              v$.repeatPassword.sameAsPassword.$message.replace(
                "value",
                "repeat password"
              )
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
