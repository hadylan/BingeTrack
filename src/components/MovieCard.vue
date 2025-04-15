<script setup>
import { useMovieModalStore } from '@/stores/useMovieModalStore'

defineProps(['movie'])
const movieModalStore = useMovieModalStore()
</script>

<template>
  <li
    class="rounded-xl overflow-hidden border-3 border-neutral-700 cursor-pointer"
    @click="movieModalStore.openMovieModal(movie.id)"
  >
    <div class="h-full flex justify-center items-center">
      <img
        v-if="movie.poster_path"
        :src="'https://image.tmdb.org/t/p/w200' + movie.poster_path"
        :alt="'Affiche du film ' + movie.title"
        class="h-full"
        :title="movie.title"
      />
      <h4 v-else>{{ movie.title }}</h4>
    </div>
  </li>
</template>
