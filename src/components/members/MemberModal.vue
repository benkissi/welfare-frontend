<script setup>
import { ref, watch, reactive } from "vue";
import { storeToRefs } from "pinia";
import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import { useAuthStore } from "../../stores/authStore";
import { useMemberStore } from "../../stores/memberStore";
import { useToast } from "primevue/usetoast";
import { sourcesList } from "../../utils/methods";

const emit = defineEmits(["close"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  request: {
    type: Object,
    default: () => {},
  },
});

const authStore = useAuthStore();
const memberStore = useMemberStore();
const toast = useToast();

const { companyInfo } = storeToRefs(authStore);
const { addingMember } = storeToRefs(memberStore);

const showModal = ref(props.show);

const formValues = reactive({
  firstName: null,
  lastName: null,
  department: null,
  email: null,
  contributionAmount: null,
  contact: null,
  deductionSource: null,
  deductionStartDate: null,
  kinName: null,
  kinContact: null,
  companyId: companyInfo ? companyInfo.value[0]?._id : null,
});

const rules = {
  firstName: { required },
  lastName: { required },
  department: { required },
  contributionAmount: { required },
  email: { required, email },
  contact: { required },
  deductionSource: { required },
  deductionStartDate: { required },
  kinName: { required },
  kinContact: { required },
  companyId: { required },
};

const v$ = useVuelidate(rules, formValues);
const submitted = ref(false);

watch(
  () => props.show,
  (newValue) => {
    showModal.value = newValue;
  }
);

const handleSubmit = async (valid) => {
  submitted.value = true;

  if (!valid) {
    return;
  }

  const payload = Object.assign({}, formValues);
  console.log("payload values", payload);
  const res = await memberStore.addMemberDetails(payload);
  memberStore.getMembers();
  if (res) {
    showModal.value = false;
    toast.add({
      severity: "success",
      summary: "Successful",
      detail: "Member added successfully",
      life: 3000,
    });
  } else {
    toast.add({
      severity: "error",
      summary: "Failed",
      detail: "Member could not be added",
      life: 3000,
    });
  }
};
</script>

<template>
  <PDialog
    v-model:visible="showModal"
    :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
    :style="{ width: '50vw' }"
    :modal="true"
    @hide="emit('close')"
    header="Add Member"
  >
    <form class="p-fluid w-full mt-5 mb-5">
      <div class="cols-span-1">
        <!-- deduction Source -->
        <div class="field mb-6">
          <div class="p-float-label p-input-icon-right">
            <div class="mb-3 text-black font-medium text-sm">
              Member Company
            </div>
            <PDropdown
              disabled
              :options="companyInfo"
              optionLabel="name"
              optionValue="_id"
              v-model="v$.companyId.$model"
            />
          </div>
          <span v-if="v$.companyId.$error && submitted">
            <span
              id="companyId-error"
              v-for="(error, index) of v$.companyId.$errors"
              :key="index"
            >
              <small class="p-error">{{ error.$message }}</small>
            </span>
          </span>
          <small
            v-else-if="
              (v$.companyId.$invalid && submitted) ||
              v$.companyId.$pending.$response
            "
            class="p-error"
            >{{
              v$.companyId.required.$message.replace("Value", "Member Company")
            }}</small
          >
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="cols-span-1">
          <!-- First name -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">First name</div>
              <PInputText
                id="firstName"
                v-model="v$.firstName.$model"
                :class="{
                  'p-invalid': v$.firstName.$invalid && submitted,
                }"
                aria-describedby="firstName-error"
                mode="currency"
                currency="GHS"
              />
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
        </div>
        <div class="cols-span-1">
          <!-- Last name -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Last name</div>
              <PInputText
                id="lastName"
                v-model="v$.lastName.$model"
                :class="{
                  'p-invalid': v$.lastName.$invalid && submitted,
                }"
                aria-describedby="lastName-error"
                mode="currency"
                currency="GHS"
              />
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
        </div>
      </div>
      <div class="grid grid-cols-2 gap-5">
        <div class="cols-span-1">
          <!-- department -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Department</div>
              <PInputText
                id="department"
                v-model="v$.department.$model"
                :class="{
                  'p-invalid': v$.department.$invalid && submitted,
                }"
                aria-describedby="department-error"
              />
            </div>
            <span v-if="v$.department.$error && submitted">
              <span
                id="department-error"
                v-for="(error, index) of v$.department.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.department.$invalid && submitted) ||
                v$.department.$pending.$response
              "
              class="p-error"
              >{{
                v$.department.required.$message.replace("Value", "Department")
              }}</small
            >
          </div>
        </div>
        <div class="cols-span-1">
          <!-- email -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Email</div>
              <PInputText
                id="email"
                v-model="v$.email.$model"
                :class="{
                  'p-invalid': v$.email.$invalid && submitted,
                }"
                aria-describedby="email-error"
                type="email"
              />
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
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="cols-span-1">
          <!-- contributionAmount -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">
                Contribution Amount
              </div>
              <PInputNumber
                id="contributionAmount"
                v-model="v$.contributionAmount.$model"
                :class="{
                  'p-invalid': v$.contributionAmount.$invalid && submitted,
                }"
                mode="currency"
                currency="GHS"
                locale="en-US"
              />
            </div>
            <span v-if="v$.contributionAmount.$error && submitted">
              <span
                id="contributionAmount-error"
                v-for="(error, index) of v$.contributionAmount.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.contributionAmount.$invalid && submitted) ||
                v$.contributionAmount.$pending.$response
              "
              class="p-error"
              >{{
                v$.contributionAmount.required.$message.replace(
                  "Value",
                  "Contribution Amount"
                )
              }}</small
            >
          </div>
        </div>
        <div class="cols-span-1">
          <!-- contact -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Contact</div>
              <PInputText
                id="contact"
                v-model="v$.contact.$model"
                :class="{
                  'p-invalid': v$.contact.$invalid && submitted,
                }"
                aria-describedby="contact-error"
                type="contact"
              />
            </div>
            <span v-if="v$.contact.$error && submitted">
              <span
                id="contact-error"
                v-for="(error, index) of v$.contact.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.contact.$invalid && submitted) ||
                v$.contact.$pending.$response
              "
              class="p-error"
              >{{
                v$.contact.required.$message.replace("Value", "Contact")
              }}</small
            >
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="cols-span-1">
          <!-- deduction Source -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">
                Deduction Source
              </div>
              <PDropdown
                :options="sourcesList"
                v-model="v$.deductionSource.$model"
              />
            </div>
            <span v-if="v$.deductionSource.$error && submitted">
              <span
                id="department-error"
                v-for="(error, index) of v$.deductionSource.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.department.$invalid && submitted) ||
                v$.department.$pending.$response
              "
              class="p-error"
              >{{
                v$.department.required.$message.replace("Value", "Department")
              }}</small
            >
          </div>
        </div>
        <div class="cols-span-1">
          <!-- deduction start date -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">
                Deduction Start Date
              </div>
              <PCalendar
                id="deductionStartDate"
                v-model="v$.deductionStartDate.$model"
                :class="{
                  'p-invalid': v$.deductionStartDate.$invalid && submitted,
                }"
                aria-describedby="deductionStartDate-error"
                type="deductionStartDate"
              />
            </div>
            <span v-if="v$.deductionStartDate.$error && submitted">
              <span
                id="deductionStartDate-error"
                v-for="(error, index) of v$.deductionStartDate.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.deductionStartDate.$invalid && submitted) ||
                v$.deductionStartDate.$pending.$response
              "
              class="p-error"
              >{{
                v$.deductionStartDate.required.$message.replace(
                  "Value",
                  "Deduction Start Date"
                )
              }}</small
            >
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div class="cols-span-1">
          <!-- kinName -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Kin Name</div>
              <PInputText
                id="kinName"
                v-model="v$.kinName.$model"
                :class="{
                  'p-invalid': v$.kinName.$invalid && submitted,
                }"
              />
            </div>
            <span v-if="v$.kinName.$error && submitted">
              <span
                id="kinName-error"
                v-for="(error, index) of v$.kinName.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.kinName.$invalid && submitted) ||
                v$.kinName.$pending.$response
              "
              class="p-error"
              >{{
                v$.kinName.required.$message.replace("Value", "Kin Name")
              }}</small
            >
          </div>
        </div>
        <div class="cols-span-1">
          <!-- Kin contact -->
          <div class="field mb-6">
            <div class="p-float-label p-input-icon-right">
              <div class="mb-3 text-black font-medium text-sm">Kin Contact</div>
              <PInputText
                id="kinContact"
                v-model="v$.kinContact.$model"
                :class="{
                  'p-invalid': v$.kinContact.$invalid && submitted,
                }"
                aria-describedby="kinContact-error"
                type="kinContact"
              />
            </div>
            <span v-if="v$.kinContact.$error && submitted">
              <span
                id="kinContact-error"
                v-for="(error, index) of v$.kinContact.$errors"
                :key="index"
              >
                <small class="p-error">{{ error.$message }}</small>
              </span>
            </span>
            <small
              v-else-if="
                (v$.kinContact.$invalid && submitted) ||
                v$.kinContact.$pending.$response
              "
              class="p-error"
              >{{
                v$.kinContact.required.$message.replace("Value", "Kin Contact")
              }}</small
            >
          </div>
        </div>
      </div>
      <div class="mt-2">
        <PButton
          :loading="addingMember"
          @click="handleSubmit(!v$.$invalid)"
          label="Add Member"
          class="bg-indigo-500 border border-indigo-500 hover:!bg-indigo-600 hover:!border-indigo-600"
        />
      </div>
    </form>
  </PDialog>
</template>
