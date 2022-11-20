<template>
  <div class="grid grid-cols-5 min-h-screen">
    <div
      class="hidden lg:block bg-gray-100 col-span-1 relative"
      ref="sidebarCol"
      id="sidebar"
    >
      <div class="h-full w-full" ref="sidebarRef">
        <SideBarVue :navigation="navItems" />
      </div>
    </div>
    <div
      class="flex flex-col p-7 lg:col-start-2 col-span-full bg-gray-100 min-h-full"
      ref="contentCol"
    >
      <div class="relative" ref="navWrapperRef">
        <PMenubar class="drop-shadow-lg rounded bg-white">
          <template #end>
            <Avatar />
          </template>
        </PMenubar>
      </div>
      <div class="mt-20 flex-1"><router-view></router-view></div>
    </div>
    <div :class="[showSidePane ? 'block' : 'hidden']">
      <SidePaneVue @close="toggleSidePane">
        <SideBarVue :navigation="navItems" />
      </SidePaneVue>
    </div>
  </div>
  <div id="modal-target"></div>
</template>

<script>
import { ref, watchEffect, computed, onMounted, onBeforeUnmount } from "vue";
import SideBarVue from "../components/layout/SideBar.vue";
import SidePaneVue from "../components/SidePane.vue";
import Avatar from "../components/Avatar.vue";
import navigation from "../navigation";
export default {
  components: {
    SideBarVue,
    Avatar,
    SidePaneVue,
  },
  setup() {
    const navItems = ref(navigation);

    const sidebarRef = ref(null);
    const sidebarCol = ref(null);
    const showSidePane = ref(false);

    const navWrapperRef = ref(null);
    const contentCol = ref(null);

    const sidebarColWidth = computed(() => {
      if (!sidebarCol.value) {
        return 0;
      }
      return sidebarCol.value.clientWidth;
    });

    const contentColWidth = computed(() => {
      if (!navWrapperRef.value) {
        return 0;
      }
      return navWrapperRef.value.clientWidth;
    });

    const resizeHandler = () => {
      const newSideBarWidth = sidebarCol.value.clientWidth;
      sidebarRef.value.style.width = newSideBarWidth + "px";

      const newNavBarWidth = contentCol.value.clientWidth - 58;
      navWrapperRef.value.style.width = newNavBarWidth + "px";

      if (window.innerWidth > 1023) {
        showSidePane.value = false;
      }
    };

    let resizeObserver;
    watchEffect(() => {
      if (sidebarRef.value && navWrapperRef.value) {
        sidebarRef.value.style.width = sidebarColWidth.value + "px";
        navWrapperRef.value.style.width = contentColWidth.value + "px";
      }
    });

    onMounted(() => {
      window.addEventListener("resize", resizeHandler);
    });

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.unobserve(sidebarRef.value);
      }
    });

    const toggleSidePane = () => {
      showSidePane.value = !showSidePane.value;
    };

    return {
      navItems,
      sidebarRef,
      sidebarCol,
      navWrapperRef,
      contentCol,
      toggleSidePane,
      showSidePane,
    };
  },
};
</script>

<style>
.inherit {
  width: inherit;
  height: inherit;
}
</style>
