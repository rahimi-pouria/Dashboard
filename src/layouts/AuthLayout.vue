<template>
  <div class="d-flex w-100 signUp">
    <div class="d-flex col-lg-8 justify-content-center align-items-center">
      <slot />
    </div>
    <div class="d-flex flex-column gap-2 col-lg-4 justify-content-center align-items-center">
      <img src="/logo/vuejs-logo.webp" onerror="this.src='/logo/vuejs-logo.webp';" class="logo" alt="">
      <p class="fs-6">سایت تستی </p>
    </div>
  </div>
</template>


<script setup lang="ts">

</script>

<style scoped lang="scss">
.signUp{
  background: linear-gradient(to right, #4facfe, #00f2fe);
  font-family: 'Vazir', sans-serif;
  height: 100vh;
}
.logo{
  width: 300px;
  height: 150px;
}
</style>