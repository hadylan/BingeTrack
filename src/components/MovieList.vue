<script setup>
import { defineProps, computed, useTemplateRef } from 'vue'
import MovieCard from './MovieCard.vue'
import { useInfiniteScroll } from '@vueuse/core'
import { useMoviesStore } from '@/stores/useMoviesStore'

const props = defineProps(['list'])
const movieStore = useMoviesStore()
const listKey = Object.keys(movieStore.movieLists).find(
  (key) => movieStore.movieLists[key].id === props.list.id,
)

const loadedMovies = computed(() => movieStore.movieLists[listKey].movies)
const el = useTemplateRef('el')

const loadMoreMovies = async () => {
  await movieStore.fetchMovieList(listKey, movieStore.movieLists[listKey].loadedPages + 1)
}

useInfiniteScroll(el, loadMoreMovies, {
  distance: 100,
  canLoadMore: () => {
    return movieStore.movieLists[listKey].loadedPages < movieStore.movieLists[listKey].totalPages
  },
})
</script>

<template>
  <div class="movie_list rounded-xl px-5 pt-4 pb-5">
    <h2 class="text-lg">{{ props.list.title }}</h2>
    <div
      ref="el"
      class="movies_list_container overflow-scroll overflow-x-hidden pr-4 mt-4 rounded-xl"
    >
      <ul class="grid grid-cols-10 gap-3 mt-4">
        <MovieCard v-for="movie in loadedMovies" :key="movie.id" :movie="movie" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.movie_list {
  background-color: #202020;
}

.movies_list_container {
  max-height: 50vh;
}
</style>
