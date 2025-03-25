<script setup>
import { onMounted } from 'vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import MovieList from '@/components/MovieList.vue'

onMounted(async () => {})
const moviesStore = useMoviesStore()
const movieList = moviesStore.movieLists.popularThisWeek
</script>

<template>
  <main>
    <MovieList :movies="movieList.movies" :listTitle="movieList.title" />
  </main>
</template>

<style></style>
