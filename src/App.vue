<script setup>
import { RouterView } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import BurgerMenu from './components/BurgerMenu.vue'

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <header>
    <nav class="w-full">
      <div class="flex flex-wrap justify-between">
        <h1 class="absolute text-2xl text-white font-semibold">BingeTrack.</h1>
        <BurgerMenu v-if="isMobile" />
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
h1 {
  font-family: 'Playfair Display';
  transform: translateX(-50%);
  left: 50%;
}
</style>
