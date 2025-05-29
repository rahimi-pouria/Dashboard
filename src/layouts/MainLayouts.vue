<template>
  <div class="d-flex w-100">
    <div class="d-flex flex-column gap-4 col-lg-10">
      <headerLayout />
      <slot />
    </div>
    <div class="d-flex col-lg-2">
      <sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">

import Sidebar from "@/components/layout/sidebar.vue";
import headerLayout from "@/components/layout/headerLayout.vue"
</script>



<style scoped lang="scss">

</style>