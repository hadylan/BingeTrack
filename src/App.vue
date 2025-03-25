<script setup>
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/useAuthStore'
import { useUserStore } from './stores/useUserStore'
import { useMoviesStore } from './stores/useMoviesStore'

onMounted(async () => {
  const authStore = useAuthStore()
  await authStore.checkUserSession()

  const userStore = useUserStore()
  await userStore.retrieveMoviesLists()

  const movieStore = useMoviesStore()
  await movieStore.getMovieList(movieStore.movieLists.popular)
})
</script>

<template>
  <HeaderBar />
  <RouterView />
</template>
