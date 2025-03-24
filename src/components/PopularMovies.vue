<script setup>
import { ref, onMounted } from 'vue'
import { useMoviesStore } from '@/stores/useMoviesStore'
import MovieCard from './MovieCard.vue'

let popularMovies = ref([])

onMounted(async () => {
  const movieStore = useMoviesStore()
  await movieStore.getPopularThisWeek()
  popularMovies.value = movieStore.moviesLists.popularThisWeek.movies
})
</script>

<template>
  <div id="popular_movies" class="rounded-xl px-5 pt-4 pb-5">
    <h2>Populaire cette semaine</h2>
    <ul class="grid grid-cols-10 gap-3 mt-4">
      <MovieCard v-for="movie in popularMovies" :key="movie.id" :movie="movie" />
    </ul>
  </div>
</template>

<style scoped>
#popular_movies {
  background-color: #202020;
}
</style>
