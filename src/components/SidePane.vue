<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import GIconsVue from "../components/GIcons.vue";
defineProps({
  position: {
    type: String,
    default: "left",
  },
});
</script>
<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    class="relative z-10"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!--
    Background backdrop, show/hide based on modal state.

    Entering: "ease-out duration-300"
      From: "opacity-0"
      To: "opacity-100"
    Leaving: "ease-in duration-200"
      From: "opacity-100"
      To: "opacity-0"
  -->
    <div
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    ></div>

    <div
      class="fixed z-10 overflow-y-auto top-0 h-full w-4/5 md:w-[340px] bg-red-500 max-w-[340px]"
      :class="position === 'left' ? 'left-0' : 'right-0'"
    >
      <div
        class="flex items-end sm:items-center w-full h-full p-4 text-center sm:p-0 bg-orange-300"
      >
        <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
        <div
          class="flex flex-col relative bg-white text-left overflow-hidden shadow-xl transform transition-all h-full w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 w-full">
            <!-- modal content here -->
            <div class="z-40">
              <GIconsVue
                name="close"
                class="text-gray-400 float-right"
                @click="$emit('close')"
              />
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
