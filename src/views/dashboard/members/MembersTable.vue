<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import CardVue from "../../../components/Card.vue";
import { useMemberStore } from "../../../stores/memberStore";

import AddMemberModal from "../../../components/members/MemberModal.vue";

const memberStore = useMemberStore();
const { members, fetchingMembers, pagingInfo } = storeToRefs(memberStore);

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
    <PInputText placeholder="Search for a member" v-model="searchQuery" />
    <PButton
      @click="showModal = true"
      label="Add Member"
      class="bg-indigo-500 border border-indigo-500 hover:!bg-indigo-600 hover:!border-indigo-600"
    />
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
      <PColumn field="firstName" header="First Name"></PColumn>
      <PColumn field="lastName" header="Last Name"></PColumn>
      <PColumn field="department" header="Department"></PColumn>
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
    </PDataTable>
  </CardVue>
</template>
