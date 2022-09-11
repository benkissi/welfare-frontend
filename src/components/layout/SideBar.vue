<template>
  <aside class="fixed top-0 left-0 h-full w-[inherit]" aria-label="Sidebar">
    <div class="overflow-y-auto py-4 px-3 h-full bg-white dark:bg-gray-800">
      <div class="mb-10 text-black w-full">
        <!-- <LogoVue /> -->
        <img src="logo.png" />
      </div>
      <ul class="space-y-4">
        <li v-for="(navItem, idx) in navigation" :key="idx">
          <router-link
            activeClass="!text-gray-100 bg-indigo-500 transition-all duration-500 hover:!bg-indigo-500"
            :to="{ name: navItem.route }"
            class="flex items-center p-2 text-base font-normal text-indigo-400 rounded hover:bg-indigo-200 transition-all ease-in-out duration-500 cursor-pointer"
          >
            <GIconsVue :name="navItem.icon" />
            <span class="ml-3">{{ navItem.name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import GIconsVue from "../GIcons.vue";
// import LogoVue from "../../assets/Logo.vue";
export default {
  components: {
    GIconsVue,
    // LogoVue,
  },
  props: {
    navigation: {
      type: Array,
      default: () => [],
      required: true,
    },
  },

  setup() {},
};
</script>
