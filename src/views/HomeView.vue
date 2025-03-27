<script setup>
import { computed } from 'vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import MovieList from '@/components/MovieList.vue'
import TrendingReviews from '@/components/TrendingReviews.vue'

const moviesStore = useMoviesStore()
const trendingMovieList = computed(() => moviesStore.movieLists.trending)
</script>

<template>
  <main>
    <MovieList
      :movies="trendingMovieList.movies"
      :listTitle="trendingMovieList.title"
      class="mb-5"
    />
    <TrendingReviews />
  </main>
</template>

<style></style>
