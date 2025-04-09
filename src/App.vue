<script setup>
import { RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue'
import { onMounted } from 'vue'
import { useAuthStore } from './stores/useAuthStore'
import { useUserStore } from './stores/useUserStore'
import { useMoviesStore } from './stores/useMoviesStore'
import { useReviewsStore } from './stores/useReviewsStore'
import MovieModal from './components/MovieModal.vue'
import { useMovieModalStore } from './stores/useMovieModalStore'

const authStore = useAuthStore()
const userStore = useUserStore()
const movieStore = useMoviesStore()
const reviewStore = useReviewsStore()
const movieModalStore = useMovieModalStore()

onMounted(async () => {
  await authStore.checkUserSession()
  await userStore.retrieveUserMovieLists()
  await movieStore.retrieveMovieLists()
  await reviewStore.getTrendingReviews(movieStore.movieLists.trending.movies)
})
</script>

<template>
  <HeaderBar />
  <MovieModal v-if="movieModalStore.isOpen" @close="movieModalStore.closeMovieModal()" />
  <RouterView />
</template>
