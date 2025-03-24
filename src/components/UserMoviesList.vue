<script setup>
import { defineProps, ref, useTemplateRef } from 'vue'
import MovieCard from '@/components/MovieCard.vue'
import { useInfiniteScroll } from '@vueuse/core'

const props = defineProps(['movies', 'listTitle'])
const data = ref([])
const el = useTemplateRef('el')

const loadMoreMovies = () => {
  const start = data.value.length
  const nextBatch = props.movies.slice(start, start + 20)
  data.value.push(...nextBatch)
}

useInfiniteScroll(el, loadMoreMovies, {
  distance: 20,
  canLoadMore: () => data.value.length < props.movies.length,
})
</script>

<template>
  <div class="wrapper px-5 pt-5 pb-7 rounded-xl">
    <h4>{{ props.listTitle }}</h4>
    <div
      id="movies_list_container"
      class="overflow-scroll overflow-x-hidden pr-4 mt-4 rounded-xl"
      ref="el"
    >
      <ul class="grid grid-cols-10 gap-3 my-1">
        <MovieCard v-for="movie in data" :key="movie.id" :movie="movie" />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background-color: #202020;
}

#movies_list_container {
  height: 50vh;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #3e3e3e;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #929292;
  border-radius: 5px;
}
</style>
