<script setup>
import { computed } from 'vue'
import MovieList from '@/components/MovieList.vue'
import { useMoviesStore } from '@/stores/useMoviesStore'

const movieStore = useMoviesStore()
const movieLists = computed(() => movieStore.movieLists)
</script>

<template>
  <MovieList v-for="list in movieLists" :key="list.id" :list="list" class="mt-4" />
</template>
