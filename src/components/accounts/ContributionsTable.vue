<script setup>
import { ref } from "vue";
import { formatDate } from "../../utils/methods";

const emit = defineEmits(["pageChange"]);
const props = defineProps({
  data: {},
  pagingInfo: {
    type: Object,
    default: () => ({
      total: 10,
      limit: 10,
      skip: 0,
    }),
  },
});

console.log("props--", props);
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

  emit("pageChange", { skip, limit });
};
</script>

<template>
  <PDataTable
    :value="data"
    :paginator="true"
    :rows="10"
    :lazy="true"
    :loading="false"
    :totalRecords="pagingInfo.total"
    @page="handlePageChange($event)"
    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
    :rowsPerPageOptions="[10, 20, 50]"
    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
  >
    <PColumn field="memberId" header="Member ID"></PColumn>
    <PColumn field="amount" header="Amount"></PColumn>
    <PColumn field="paymentSource" header="Payment Source"></PColumn>
    <PColumn field="date" header="Date">
      <template #body="slotProps">
        <div>{{ formatDate(slotProps.data.createdAt) }}</div>
      </template>
    </PColumn>
    <PColumn header="Operator">
      <template #body="slotProps">
        <div>
          {{
            slotProps.data.operatorDetails
              ? slotProps.data.operatorDetails.firstName +
                " " +
                slotProps.data.operatorDetails.lastName
              : slotProps.data.operator
          }}
        </div>
      </template>
    </PColumn>
    <PColumn field="" header="Actions"></PColumn>
  </PDataTable>
</template>
