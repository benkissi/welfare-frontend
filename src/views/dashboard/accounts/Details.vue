<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, computed, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAccountsStore } from "../../../stores/accountsStore";
import Card from "../../../components/Card.vue";
import GIcons from "../../../components/GIcons.vue";
import ContributionsTable from "../../../components/accounts/ContributionsTable.vue";
import AddTransactionModalVue from "../../../components/accounts/AddTransactionModal.vue";
import SettingsModal from "../../../components/accounts/SettingsModal.vue";
import { genFilter } from "../../../utils/methods";

const accountStore = useAccountsStore();
const {
  fetchingAccountDetails,
  currentAccount,
  currentContributions,
  currentRedrawals,
  contributionsPagingInfo,
  redrawalsPagingInfo,
} = storeToRefs(accountStore);

const route = useRoute();
const id = route.params?.id;

const showTransactionModal = ref(false);
const showSettings = ref(false);
const transactionType = ref("Contribution");
const startDate = ref("");
const endDate = ref("");
const skip = ref(0);
const limit = ref(10);

const filterString = computed(() => {
  console.log("startdate", startDate.value);
  const filterObj = {};

  if (startDate.value) {
    filterObj["createdAt[$gte]"] = new Date(startDate.value).getTime();
  }

  if (endDate.value) {
    filterObj["createdAt[$lte]"] = new Date(endDate.value).getTime();
  }
  return genFilter(filterObj);
});

const tabList = [
  {
    label: "Contributions",
  },
  {
    label: "Redrawals",
  },
];

const activeTabIndex = ref(0);

const handleAddTransaction = (type) => {
  transactionType.value = type;
  showTransactionModal.value = true;
};

const onPageChange = async (type, details) => {
  skip.value = details.skip;
  limit.value = details.limit;

  if (type === "contributions") {
    await accountStore.fetchContributions(id, details.skip, details.limit);
  }

  if (type === "redrawals") {
    await accountStore.fetchRedrawals(id, details.skip, details.limit);
  }
};

watch(
  () => filterString.value,
  (newValue) => {
    if (activeTabIndex.value === 0) {
      accountStore.fetchContributions(id, skip.value, limit.value, newValue);
    }

    if (activeTabIndex.value === 1) {
      accountStore.fetchRedrawals(id, skip.value, limit.value, newValue);
    }
  }
);

if (id) {
  accountStore.fetchAccountDetails(id);
  accountStore.fetchContributions(id);
  accountStore.fetchRedrawals(id);
}
</script>
<template>
  <div class="text-gray-500">
    <AddTransactionModalVue
      :show="showTransactionModal"
      @close="showTransactionModal = false"
      :transactionType="transactionType"
      :id="id"
    />
    <SettingsModal
      :show="showSettings"
      @close="showSettings = false"
      :isActive="!!currentAccount?.active"
      :id="id"
    />
    <div
      v-if="fetchingAccountDetails"
      class="flex w-full justify-center items-center"
    >
      <PSpinner
        style="width: 40px; height: 50px"
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
    <Card v-else>
      <div class="grid grid-cols-4 gap-10">
        <div class="flex justify-center items-center">
          <div
            class="w-[90px] h-[90px] bg-slate-600 rounded-full overflow-hidden mr-2"
          >
            <img
              class="w-100 h-full"
              src="https://images.generated.photos/gX3Hmj9wbExB6HPYwXm6wS9bAIBYtv0xdzrWEFfy0v8/rs:fit:512:512/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDc2Mjc2LmpwZw.jpg"
            />
          </div>
          <div>
            <div class="font-bold text-slate-800 text-medium">
              {{ currentAccount.firstName }} {{ currentAccount.lastName }}
            </div>
            <div class="font-medium text-slate-400">
              {{ currentAccount.memberId }}
            </div>
            <div class="font-medium text-slate-400">
              CA: GHS {{ currentAccount.contributionAmount }}
            </div>
          </div>
        </div>

        <!-- amount card -->
        <div class="flex bg-green-500 rounded p-3">
          <div class="flex flex-col justify-between">
            <div class="text-green-100 font-medium">GHS</div>
            <div class="text-green-100 text-2xl mt-1 mb-1 font-bold">
              {{ currentAccount.totalContributions }}
            </div>
            <div class="text-green-200 font-light">Contributions</div>
          </div>
          <div class="ml-auto">
            <div
              class="flex items-center justify-center w-[30px] h-[30px] bg-green-300 rounded-full text-green-500"
            >
              <GIcons name="arrow_upward" />
            </div>
          </div>
        </div>

        <div class="flex bg-red-500 rounded p-3">
          <div class="flex flex-col justify-between">
            <div class="text-red-100 font-medium">GHS</div>
            <div class="text-red-100 text-2xl mt-1 mb-1 font-bold">
              {{ currentAccount.totalRedrawals }}
            </div>
            <div class="text-red-200 font-light">Redrawals</div>
          </div>
          <div class="ml-auto">
            <div
              class="flex items-center justify-center w-[30px] h-[30px] bg-red-300 rounded-full text-red-500"
            >
              <GIcons name="arrow_downward" />
            </div>
          </div>
        </div>

        <div class="flex bg-indigo-500 rounded p-3">
          <div class="flex flex-col justify-between">
            <div class="text-indigo-100 font-medium">GHS</div>
            <div class="text-indigo-100 text-2xl mt-1 mb-1 font-bold">
              {{ currentAccount.balance }}
            </div>
            <div class="text-indigo-200 font-light">Balance</div>
          </div>
          <div class="ml-auto">
            <div
              class="flex items-center justify-center w-[30px] h-[30px] bg-indigo-300 rounded-full text-indigo-500"
            >
              <GIcons name="payments" />
            </div>
          </div>
        </div>
      </div>

      <div class="mt-5 relative">
        <div class="flex items-center absolute top-0 right-3 z-50">
          <div class="mr-2">Account Status:</div>
          <PChip
            :label="currentAccount.active ? 'Active' : 'In-Active'"
            class="text-white"
            :class="[currentAccount.active ? 'bg-success' : 'bg-red-500']"
          />
          <GIcons
            name="settings"
            class="ml-5 cursor-pointer"
            @click="showSettings = true"
          />
        </div>
        <PTabMenu
          :model="tabList"
          v-model:activeIndex="activeTabIndex"
        ></PTabMenu>

        <div class="mt-5">
          <div v-if="activeTabIndex === 0">
            <div class="flex items-center mb-4">
              <div class="flex items-center">
                <div class="mr-4">
                  <div>Start Date</div>
                  <PCalendar v-model="startDate" />
                </div>
                <div>
                  <div>End Date</div>
                  <PCalendar v-model="endDate" />
                </div>
              </div>
              <div class="ml-auto w-[20%]">
                <PButton
                  label="Add Contribution"
                  class="button-success"
                  @click="handleAddTransaction('Contribution')"
                />
              </div>
            </div>
            <ContributionsTable
              :data="currentContributions"
              :pagingInfo="contributionsPagingInfo"
              @pageChange="(details) => onPageChange('contributions', details)"
            />
          </div>
          <div v-if="activeTabIndex === 1">
            <div class="flex items-center mb-4">
              <div class="flex items-center">
                <div class="mr-4">
                  <div>Start Date</div>
                  <PCalendar v-model="startDate" />
                </div>
                <div>
                  <div>End Date</div>
                  <PCalendar v-model="endDate" />
                </div>
              </div>
              <div class="ml-auto w-[20%]">
                <PButton
                  label="Add Redrawal"
                  class="button-success"
                  @click="handleAddTransaction('Redrawal')"
                />
              </div>
            </div>
            <ContributionsTable
              :data="currentRedrawals"
              :pagingInfo="redrawalsPagingInfo"
              @pageChange="(details) => onPageChange('redrawals', details)"
            />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
