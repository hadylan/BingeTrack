<script setup>
import { onMounted } from 'vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import MovieList from '@/components/MovieList.vue'

onMounted(async () => {})
const moviesStore = useMoviesStore()
const popularMovieList = moviesStore.movieLists.popular
</script>

<template>
  <main>
    <MovieList :movies="popularMovieList.movies" :listTitle="popularMovieList.title" />
  </main>
</template>

<style></style>
