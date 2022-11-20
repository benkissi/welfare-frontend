<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import CardVue from "../../../components/Card.vue";
import { useMemberStore } from "../../../stores/memberStore";
import GIcons from "../../../components/GIcons.vue";

import AddMemberModal from "../../../components/members/MemberModal.vue";

const memberStore = useMemberStore();
const { members, fetchingMembers, pagingInfo } = storeToRefs(memberStore);
const router = useRouter();

const showModal = ref(false);
const searchQuery = ref("");

const currentPage = ref(1);
const pageSize = ref(10);

const handlePageChange = (eventDetails) => {
  console.log("event", eventDetails);
  const page = eventDetails.page + 1;
  const size = eventDetails.rows;

  currentPage.value = page;
  pageSize.value = size;

  const skip = currentPage.value === 1 ? 0 : currentPage.value * pageSize.value;
  const limit = pageSize.value;

  memberStore.getMembers(searchQuery.value, skip, limit);
};

const tableActions = [
  {
    key: "view_details",
    label: "View Details  ",
    route: "accountDetails",
  },
  // {
  //   key: "edit_details",
  //   label: "Edit Details",
  // },
];

const handleActionSelect = (item, action) => {
  console.log("item", item);
  router.push({
    name: action.route,
    params: { id: item._id },
  });
};

watch(
  () => searchQuery.value,
  async (newValue) => {
    const skip =
      currentPage.value === 1 ? 0 : currentPage.value * pageSize.value;
    const limit = pageSize.value;
    memberStore.getMembers(newValue, skip, limit);
  }
);

memberStore.getMembers();
</script>
<template>
  <AddMemberModal :show="showModal" @close="showModal = false" />
  <div class="bg-white mb-5 rounded p-5 flex justify-between">
    <PInputText placeholder="Search for a account" v-model="searchQuery" />
    <!-- <PButton
      @click="showModal = true"
      label="Add Member"
      class="bg-indigo-500 border border-indigo-500 hover:!bg-indigo-600 hover:!border-indigo-600"
    /> -->
  </div>
  <CardVue class="text-gray-500">
    <PDataTable
      :value="members"
      :paginator="true"
      :rows="10"
      :lazy="true"
      :loading="fetchingMembers"
      :totalRecords="pagingInfo.total"
      @page="handlePageChange($event)"
      paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
      :rowsPerPageOptions="[10, 20, 50]"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
    >
      <PColumn field="memberId" header="Member ID"></PColumn>
      <PColumn field="deductionSource" header="Source">
        <template #body="slotProps">
          <div class="capitalize">{{ slotProps.data[slotProps.field] }}</div>
        </template>
      </PColumn>
      <PColumn field="contributionAmount" header="Contribution Amount">
        <template #body="slotProps">
          <div>GHS {{ slotProps.data[slotProps.field] }}</div>
        </template>
      </PColumn>

      <PColumn field="totalContributions" header="Total Contributions"
        ><template #body="slotProps">
          <div>GHS {{ slotProps.data[slotProps.field] }}</div>
        </template></PColumn
      >
      <PColumn field="totalRedrawals" header="Total Redrawals">
        <template #body="slotProps">
          <div>GHS {{ slotProps.data[slotProps.field] }}</div>
        </template>
      </PColumn>

      <PColumn field="balance" header="Balance"
        ><template #body="slotProps">
          <div>GHS {{ slotProps.data[slotProps.field] }}</div>
        </template></PColumn
      >
      <PColumn field="" header="Actions"
        ><template #body="slotProps">
          <PDropdown
            @change="(event) => handleActionSelect(slotProps.data, event.value)"
            :options="tableActions"
            optionLabel="label"
            inputClass="py-2 text-sm hidden"
            panelClass="text-sm"
          >
            <template #indicator>
              <GIcons name="more_vert" />
            </template>
            <template #option="optionProps">
              <router-link
                :to="{
                  name: optionProps.option.route,
                  params: { id: slotProps.data._id },
                }"
                >{{ optionProps.option.label }}</router-link
              >
            </template>
          </PDropdown>
        </template></PColumn
      >
    </PDataTable>
  </CardVue>
</template>

<style scoped>
:deep(.p-paginator-bottom) {
  display: flex;
  flex-direction: row;
}

:deep(.p-paginator-bottom) > * {
  order: 3;
}

:deep(.p-paginator-rpp-options) {
  order: 2;
  margin-right: auto;
}

:deep(.p-paginator-current) {
  order: 1;
}

:deep(.p-calendar .p-inputtext) {
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 0.75rem 0.75rem;
}

:deep(.p-dropdown) {
  border-width: 0px;
}
</style>
