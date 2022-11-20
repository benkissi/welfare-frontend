<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import MetricItem from "../../../components/dashboard/MetricItem.vue";
import { useDashboardStore } from "../../../stores/dashboardStore";
import { useAuthStore } from "../../../stores/authStore";

import { getDateRange, genFilter, genGraphData } from "../../../utils/methods";

const dashboardStore = useDashboardStore();
const authStore = useAuthStore();
const { companyInfo } = storeToRefs(authStore);
const { fetchingMetrics, metrics } = storeToRefs(dashboardStore);

const yearGraph = computed(() => {
  if (!metrics.value) return {};
  const data = genGraphData(metrics.value.yearMetrics);
  return data;
});

const duration = ref({
  label: "Last 30 days",
  value: "30_days_ago",
});

const durationList = [
  {
    label: "Last 30 days",
    value: "30_days_ago",
  },
  {
    label: "This month",
    value: "this_month",
  },
  {
    label: "Last month",
    value: "last_month",
  },
  {
    label: "Last 3 months",
    value: "last_3_months",
  },
];

watch(
  () => duration.value,
  async (newValue) => {
    const range = getDateRange(newValue.value);
    const filterObj = {};

    if (range.startDate) {
      filterObj["createdAt[$gte]"] = new Date(range.startDate).getTime();
    }

    if (range.endDate) {
      filterObj["createdAt[$lte]"] = new Date(range.endDate).getTime();
    }

    const filterString = genFilter(filterObj);
    const companyId = companyInfo.value ? companyInfo.value[0]._id : "";

    await dashboardStore.getMetrics(companyId, filterString);
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="text-gray-500">
    <div class="bg-white rounded drop-shadow-sm p-5">
      <div class="w-full flex justify-center" v-if="fetchingMetrics">
        <PSpinner
          style="width: 40px; height: 50px"
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>

      <div v-else>
        <div
          class="flex justify-between items-center border-b border-gray-300 mb-5 pb-4"
        >
          <div class="italic">{{ duration.label }}</div>
          <PDropdown
            :options="durationList"
            v-model="duration"
            optionLabel="label"
            placeholder="select duration"
            class=""
          />
        </div>
        <div class="grid grid-cols-4 gap-8">
          <MetricItem
            title="Total contributions"
            :value="metrics.totalContributions"
            color="green"
            icon="arrow_upward"
          />
          <MetricItem
            title="Total Redrawals"
            :value="metrics.totalRedrawals"
            color="red"
            icon="arrow_downward"
          />

          <MetricItem
            title="Bank Balance"
            :value="200"
            color="indigo"
            icon="payments"
          />

          <MetricItem
            title="Total Members"
            :value="metrics.membersCount"
            color="sky"
            icon="people"
            :isCurrency="false"
          />
        </div>
      </div>
    </div>
    <div class="mt-10 bg-white rounded drop-shadow-sm p-5">
      <div class="w-full flex justify-center" v-if="fetchingMetrics">
        <PSpinner
          style="width: 40px; height: 50px"
          strokeWidth="5"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
      </div>
      <PAccordion :multiple="true" :activeIndex="[0]">
        <PAccordionTab header="Transactions">
          <PChart type="bar" :data="yearGraph" :height="100" />
        </PAccordionTab>
        <!-- <PAccordionTab header="Header II"> Content </PAccordionTab>
        <PAccordionTab header="Header III"> Content </PAccordionTab> -->
      </PAccordion>
    </div>
  </div>
</template>
