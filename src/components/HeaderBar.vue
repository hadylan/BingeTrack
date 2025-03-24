<script setup>
import { useMediaQuery } from '@vueuse/core'
import BurgerMenu from './BurgerMenu.vue'
import AuthModal from './AuthModal.vue'
import { useUIStore } from '@/stores/useUIStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

const uiStore = useUIStore()
const userStore = useUserStore()
const isMobile = useMediaQuery('(max-width: 768px)')

const { user } = storeToRefs(userStore)
</script>

<template>
  <header class="md:px-4 mb-7">
    <nav class="w-full h-full">
      <div class="flex flex-wrap justify-between">
        <div class="left_section flex items-center" v-if="!isMobile">
          <button type="button" class="cursor-pointer">
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
            <span class="sr-only">Search icon</span>
          </button>
          <RouterLink to="/" class="ml-7">Accueil</RouterLink>
          <RouterLink to="/movies" class="ml-7">Films</RouterLink>
        </div>
        <h1 class="text-2xl text-white font-semibold">
          <RouterLink to="/">BingeTrack.</RouterLink>
        </h1>
        <div class="right_section flex items-center" v-if="!isMobile">
          <button
            v-if="user.id === null"
            type="button"
            class="text-black font-medium rounded-lg text-sm px-5 py-2.5 bg-gray-200 hover:bg-gray-300 cursor-pointer"
            @click="uiStore.openAuthModal()"
          >
            S'identifier
          </button>
          <RouterLink v-else to="/profile"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle></svg
          ></RouterLink>
        </div>
        <BurgerMenu v-if="isMobile" />
      </div>
      <AuthModal v-if="uiStore.isAuthModalOpen" />
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
