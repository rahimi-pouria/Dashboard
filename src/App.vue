<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'

import MainLayouts from './layouts/MainLayouts.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()

const layout = computed(() => {
  switch (route.meta.layout) {
    case 'AuthLayout':
      return AuthLayout
    case 'MainLayouts':
    default:
      return MainLayouts
  }
})
</script>

<style scoped>
</style>
