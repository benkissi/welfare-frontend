<script setup>
import GIcons from "../GIcons.vue";
import { formatNumber } from "../../utils/methods";

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  title: {
    type: String,
    default: "Metric",
  },
  icon: {
    type: String,
    default: "payments",
  },
  color: {
    type: String,
    default: "indigo",
  },
  isCurrency: {
    type: Boolean,
    default: true,
  },
});

const metricColors = {
  indigo: {
    bg: "bg-indigo-500",
    iconBg: "bg-indigo-300",
    icon: "text-indigo-500",
    title: "text-indigo-200",
    otherText: "text-indigo-100",
  },
  green: {
    bg: "bg-green-500",
    iconBg: "bg-green-300",
    icon: "text-green-500",
    title: "text-green-200",
    otherText: "text-green-100",
  },
  red: {
    bg: "bg-red-500",
    iconBg: "bg-red-300",
    icon: "text-red-500",
    title: "text-red-200",
    otherText: "text-red-100",
  },
  sky: {
    bg: "bg-sky-500",
    iconBg: "bg-sky-300",
    icon: "text-sky-500",
    title: "text-sky-200",
    otherText: "text-sky-100",
  },
};
</script>

<template>
  <div class="flex rounded p-3" :class="[color && metricColors[color]?.bg]">
    <div class="flex flex-col justify-between">
      <div
        class="font-medium"
        :class="[metricColors[color]?.otherText, !isCurrency && 'opacity-0']"
      >
        GHS
      </div>
      <div
        class="text-2xl mt-1 mb-1 font-bold"
        :class="[metricColors[color]?.otherText]"
      >
        {{ formatNumber(value) }}
      </div>
      <div class="font-light" :class="[metricColors[color]?.title]">
        {{ title }}
      </div>
    </div>
    <div class="ml-auto">
      <div
        class="flex items-center justify-center w-[30px] h-[30px] rounded-full"
        :class="[metricColors[color]?.iconBg, metricColors[color]?.icon]"
      >
        <GIcons :name="icon" />
      </div>
    </div>
  </div>
</template>
