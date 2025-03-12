<script setup>
import { useMediaQuery } from '@vueuse/core'
import BurgerMenu from './BurgerMenu.vue'

const isMobile = useMediaQuery('(max-width: 768px)')
</script>

<template>
  <header class="px-4">
    <nav class="w-full h-full">
      <div class="flex flex-wrap justify-between">
        <div class="left_section flex items-center" v-if="!isMobile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <RouterLink to="#" class="ml-7">Films</RouterLink>
        </div>
        <h1 class="text-2xl text-white font-semibold">
          <RouterLink to="/">BingeTrack.</RouterLink>
        </h1>
        <div class="right_section flex items-center" v-if="!isMobile">
          <RouterLink to="#">Profil</RouterLink>
        </div>
        <BurgerMenu v-if="isMobile" />
      </div>
    </nav>
  </header>
</template>

<style scoped>
h1 {
  font-family: 'Playfair Display';
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
}
</style>
