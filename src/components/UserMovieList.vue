<script setup>
import { defineProps, ref, useTemplateRef } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { useInfiniteScroll } from '@vueuse/core'

const props = defineProps(['movies', 'listTitle'])
const loadedMovies = ref([])
const el = useTemplateRef('el')

const loadMoreMovies = () => {
  const start = loadedMovies.value.length
  const nextBatch = props.movies.slice(start, start + 20)
  loadedMovies.value.push(...nextBatch)
}

useInfiniteScroll(el, loadMoreMovies, {
  distance: 20,
  canLoadMore: () => loadedMovies.value.length < props.movies.length,
})
</script>

<template>
  <div class="wrapper px-5 pt-5 pb-7 rounded-xl">
    <h2>{{ props.listTitle }}</h2>
    <div
      class="movies_list_container overflow-scroll overflow-x-hidden pr-4 mt-4 rounded-xl"
      ref="el"
    >
      <ul class="grid grid-cols-10 gap-3 my-1">
        <MovieCard v-for="movie in loadedMovies" :key="movie.id" :movie="movie" />
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
