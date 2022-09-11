<script setup>
import AvatarVue from "../Avatar.vue";
import GIconsVue from "../GIcons.vue";

const emit = defineEmits(["menuIconClick"]);

const handleMenuClick = () => {
  emit("menuIconClick");
};
</script>

<template>
  <nav
    class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 w-[inherit] fixed z-10 drop-shadow-lg"
  >
    <div class="flex flex-wrap justify-between items-center w-100">
      <div>
        <GIconsVue
          class="block lg:hidden text-gray-600"
          name="menu"
          @click="handleMenuClick"
        />
        <!-- <ul
          class="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
        > -->

        <!-- <li>
            <a
              href="#"P
              class="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
              aria-current="page"
              >Home</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >About</a
            >
          </li> -->
        <!-- </ul> -->
      </div>
      <div class="text-black" id="navbar-default">
        <AvatarVue />
      </div>
    </div>
  </nav>
</template>
