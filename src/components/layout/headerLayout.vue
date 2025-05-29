<template>
  <!--begin::Header-->
  <div class="header w-100 d-flex align-items-center px-5">
    <CustomButton id="logOut" label="خروج" color="light-primary" btn-class="border" @click="logout"/>
  </div>
  <!--end::Header-->
</template>

<script setup lang="ts">

import CustomButton from "@/components/CustomButton.vue";
import router from "@/router";

const logout = () => {
  sessionStorage.clear()
  router.push('/SignIn')
}

</script>
<style>
.header{
  z-index: 101 !important;
  border-bottom: 1px solid #e1e1e1;
  height: 70px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
.btn-hover-log-out:hover {
  background: navajowhite;
}

</style>