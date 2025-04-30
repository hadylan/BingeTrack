<script setup>
import { ref } from 'vue'
import { useUIStore } from '@/stores/useUIStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'

const uiStore = useUIStore()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const showBurgerMenu = ref(false)
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center justify-center p-2 w-8 text-white"
    @click="showBurgerMenu = !showBurgerMenu"
  >
    <span class="sr-only">Open main menu</span>
    <svg
      class="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 17 14"
    >
      <path
        stroke="currentColor"
        stroke-linecap="square"
        stroke-linejoin="square"
        stroke-width="2"
        d="M1 1h15M1 7h15M1 13h15"
      />
    </svg>
  </button>
  <div v-if="showBurgerMenu" class="w-full pt-3" id="navbar-hamburger">
    <ul class="flex flex-col px-3 text-white font-light">
      <li>
        <RouterLink to="/" class="block py-2 border-b-1 border-gray-500" aria-current="page"
          >Accueil</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/movies" class="block py-2 border-b-1 border-gray-500">Films</RouterLink>
      </li>
      <li v-if="user.id === null">
        <span @click="uiStore.openAuthModal()" class="block py-2 border-b-1 border-gray-500"
          >S'identifier</span
        >
      </li>
      <li v-else>
        <RouterLink to="/profile" class="block py-2 border-b-1 border-gray-500">Profil</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
