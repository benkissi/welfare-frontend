<script setup>
import { ref, reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { storeToRefs } from "pinia";
import { email, required } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const { loading, companyInfo } = storeToRefs(authStore);

const state = reactive({
  name: "",
  branch: "",
  email: "",
  address: "",
  phone: "",
});

const rules = {
  name: { required },
  branch: { required },
  email: { email },
  phone: { required },
  address: { required },
};

const v$ = useVuelidate(rules, state);
const submitted = ref(false);

const logoUploader = () => {};

const handleSubmit = (isFormValid) => {
  submitted.value = true;
  console.log("clicked--");
  if (!isFormValid) {
    return;
  }
  console.log("submit--", state);
  authStore.addCompanyInfo(state);
};

watchEffect(() => {
  if (companyInfo.value) {
    router.push({ name: "inviteManagersStep" });
  }
});
</script>
<template>
  <div class="flex w-full h-full place-content-center">
    <div class="w-full min-h-1/2">
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid w-full">
        <div class="field mb-8">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PInputText
              id="name"
              v-model="v$.name.$model"
              :class="{ 'p-invalid': v$.name.$invalid && submitted }"
              aria-describedby="name-error"
            />
            <label
              for="name"
              :class="{ 'p-error': v$.name.$invalid && submitted }"
              >Company Name*</label
            >
          </div>
          <span v-if="v$.name.$error && submitted">
            <span
              id="company-name-error"
              v-for="(error, index) of v$.name.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.name.$invalid && submitted) || v$.name.$pending.$response
            "
            class="p-error"
            >{{
              v$.name.required.$message.replace("Value", "Company name")
            }}</small
          >
        </div>

        <div class="field mb-8">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PInputText
              id="branch"
              v-model="v$.branch.$model"
              :class="{ 'p-invalid': v$.branch.$invalid && submitted }"
              aria-describedby="email-error"
            />
            <label
              for="branch"
              :class="{ 'p-error': v$.branch.$invalid && submitted }"
              >Company Branch*</label
            >
          </div>
          <span v-if="v$.branch.$error && submitted">
            <span
              id="branch-error"
              v-for="(error, index) of v$.branch.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.branch.$invalid && submitted) || v$.branch.$pending.$response
            "
            class="p-error"
            >{{ v$.branch.required.$message.replace("Value", "Branch") }}</small
          >
        </div>

        <div class="field mb-8">
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
              >Company Email</label
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
            >{{
              v$.email.required.$message.replace("Value", "Company email")
            }}</small
          >
        </div>

        <div class="field mb-8">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <!-- <PInputText
              id="phone"
              v-model="v$.phone.$model"
              :class="{ 'p-invalid': v$.branch.$invalid && submitted }"
              aria-describedby="email-error"
            /> -->
            <vue-tel-input
              id="phone"
              v-model="v$.phone.$model"
              :class="{
                '!p-invalid border-red-400': v$.branch.$invalid && submitted,
              }"
              class="!py-1"
              aria-describedby="phone-error"
            ></vue-tel-input>
          </div>
          <span v-if="v$.phone.$error && submitted">
            <span
              id="branch-error"
              v-for="(error, index) of v$.phone.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.phone.$invalid && submitted) || v$.phone.$pending.$response
            "
            class="p-error"
            >{{ v$.phone.required.$message.replace("Value", "Phone") }}</small
          >
        </div>

        <div class="field mb-8">
          <div class="p-float-label p-input-icon-right">
            <i class="pi pi-envelope" />
            <PTextarea
              id="address"
              v-model="v$.address.$model"
              :class="{ 'p-invalid': v$.address.$invalid && submitted }"
              rows="5"
              cols="30"
            />
            <label
              for="address"
              :class="{ 'p-error': v$.address.$invalid && submitted }"
              >Company Address*</label
            >
          </div>
          <span v-if="v$.address.$error && submitted">
            <span
              id="company-name-error"
              v-for="(error, index) of v$.address.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.address.$invalid && submitted) ||
              v$.address.$pending.$response
            "
            class="p-error"
            >{{
              v$.address.required.$message.replace("Value", "Company Address")
            }}</small
          >
        </div>

        <div class="field mb-8">
          <label for="logo">Company Logo*</label>
          <PFileUpload
            class="mt-2"
            id="logo"
            mode="basic"
            name="demo[]"
            :customUpload="true"
            @uploader="logoUploader"
          />
        </div>

        <PButton
          :loading="loading"
          label="Next"
          type="submit"
          class="mt-5 bg-indigo-500 hover:!bg-indigo-600 border-indigo-500 hover:border-indigo-500"
        />
      </form>
    </div>
  </div>
</template>
