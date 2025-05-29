<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid w-100">

    <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper" ref="scrollElRef">
      <!--begin::Scroll wrapper-->
      <div class="sidebar w-100"
      >
        <!--begin::Menu-->
        <div
            class="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6"
            id="#kt_app_sidebar_menu"
            data-kt-menu="true"
            data-kt-menu-expand="false"
        >
          <div class="logo p-3">
            <img  src="/logo/e904130c-0219-4867-812c-c4f52c6087fb.png"
                 onerror="this.src='/logo/e904130c-0219-4867-812c-c4f52c6087fb.png'" />
          </div>
          <!--begin:Menu item static (dashboard link)-->
          <div class="menu-item here show text-center">
            <span class="menu-link">
              <router-link to="/">
                <span class="menu-icon">
                  <KTIcon icon-name="element-11" icon-class="fs-2"/>
                </span>
                <span class="menu-title">داشبورد</span>
              </router-link>
            </span>
          </div>
          <!--end:Menu item static-->
        </div>
        <!--end::Menu-->
      </div>
      <!--end::Scroll wrapper-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import KTIcon from "@/core/helpers/kt-icon/KTIcon.vue";

export default defineComponent({
  name: "SidebarMenu",
  components: { KTIcon },
  setup() {
    const scrollElRef = ref<HTMLElement | null>(null);

    const routes = ref([
      {
        title: "داشبورد",
        icon: "dashboard",
      },
    ]);

    return {
      routes,
      scrollElRef,
    };
  },
});
</script>

<style scoped>
a{
  color: white;
  text-decoration: none;
}
  .sidebar{
    background: #131313;
    height: 911px;
  }
</style>
