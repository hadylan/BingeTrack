<script setup>
import { defineProps } from 'vue'
import MovieCard from './MovieCard.vue'

const props = defineProps(['movies', 'listTitle'])
</script>

<template>
  <div class="movie_list rounded-xl px-5 pt-4 pb-5">
    <h2 class="text-lg">{{ props.listTitle }}</h2>
    <ul class="grid grid-cols-10 gap-3 mt-4">
      <MovieCard v-for="movie in props.movies" :key="movie.id" :movie="movie" />
    </ul>
  </div>
</template>

<style scoped>
.movie_list {
  background-color: #202020;
}
</style>
