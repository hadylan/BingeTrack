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
      v-if="loadedMovies && loadedMovies.length >= 10"
      ref="el"
      class="movies_list_container overflow-scroll overflow-x-hidden pr-4 mt-4 rounded-xl"
    >
      <ul class="grid-cols-3 grid md:grid-cols-7 lg:grid-cols-10 gap-3 mt-4">
        <MovieCard v-for="movie in loadedMovies" :key="movie.id" :movie="movie" />
      </ul>
    </div>

    <div v-else role="status" class="flex items-center space-x-5 py-5 animate-pulse">
      <div
        v-for="(item, index) in 8"
        :key="index"
        class="flex items-center justify-center p-10 w-full h-55 bg-neutral-700 rounded-sm sm:w-96"
      >
        <svg
          class="w-10 h-10 text-neutral-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>

      <span class="sr-only">Loading...</span>
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
