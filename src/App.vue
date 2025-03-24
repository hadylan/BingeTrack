<script setup>
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/useAuthStore'
import { useUserStore } from './stores/useUserStore'

onMounted(async () => {
  const authStore = useAuthStore()
  const userStore = useUserStore()

  await authStore.checkUserSession()
  await userStore.retrieveMoviesLists()
})
</script>

<template>
  <HeaderBar />
  <RouterView />
</template>
