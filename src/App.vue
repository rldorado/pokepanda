<script setup lang="ts">
import { clearExpiredCache } from '@/services'
import { onMounted } from 'vue'

onMounted(() => clearExpiredCache())
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>
