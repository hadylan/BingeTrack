<script setup>
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/useAuthStore'
import { useUserStore } from './stores/useUserStore'
import { useMoviesStore } from './stores/useMoviesStore'
import { useReviewsStore } from './stores/useReviewsStore'

onMounted(async () => {
  const authStore = useAuthStore()
  await authStore.checkUserSession()

  const userStore = useUserStore()
  await userStore.retrieveUserMovieLists()

  const movieStore = useMoviesStore()
  await movieStore.retrieveMovieLists()

  const reviewStore = useReviewsStore()
  await reviewStore.getTrendingReviews(movieStore.movieLists.trending.movies)
})
</script>

<template>
  <HeaderBar />
  <RouterView />
</template>
