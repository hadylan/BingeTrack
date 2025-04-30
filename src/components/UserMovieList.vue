<script setup>
import { defineProps } from 'vue'
import MovieCard from '@/components/MovieCard.vue'

const props = defineProps(['movieList'])
</script>

<template>
  <div class="wrapper px-5 pt-5 pb-7 rounded-xl">
    <h2>{{ props.movieList.title }}</h2>
    <div class="movies_list_container overflow-scroll overflow-x-hidden pr-4 mt-4 rounded-xl">
      <ul class="grid grid-cols-3 grid md:grid-cols-7 lg:grid-cols-10 gap-3 my-1">
        <MovieCard v-for="movie in props.movieList.movies" :key="movie.id" :movie="movie" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #202020;
}

.movies_list_container {
  max-height: 50vh;
}
</style>
