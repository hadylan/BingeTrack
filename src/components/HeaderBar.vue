<script setup>
import { ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import BurgerMenu from './BurgerMenu.vue'
import AuthModal from './AuthModal.vue'
import { useUIStore } from '@/stores/useUIStore'
import { useUserStore } from '@/stores/useUserStore'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/stores/useMoviesStore'
import { useMovieModalStore } from '@/stores/useMovieModalStore'

const uiStore = useUIStore()
const userStore = useUserStore()
const movieStore = useMoviesStore()
const movieModal = useMovieModalStore()
const isMobile = useMediaQuery('(max-width: 768px)')

const searchResult = ref()
const showSearchbar = ref(false)
const searchBarValue = ref()
let timeoutId

function searchMovie() {
  clearTimeout(timeoutId)

  timeoutId = setTimeout(async () => {
    searchResult.value = await movieStore.searchMovieByName(searchBarValue.value)
  }, 1000)
}

function closeSearch() {
  showSearchbar.value = false
  searchBarValue.value = ''
  searchResult.value = null
}

const { user } = storeToRefs(userStore)
</script>

<template>
  <header class="md:px-4 mb-7">
    <nav class="w-full h-full">
      <div class="flex flex-wrap justify-between">
        <div class="left_section flex items-center" v-if="!isMobile">
          <button
            v-if="!showSearchbar"
            type="button"
            class="cursor-pointer"
            @click="showSearchbar = true"
          >
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
          <form v-else @submit.prevent="">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <button
                type="button"
                class="absolute inset-y-0 start-0 flex items-center ms-3 cursor-pointer"
              >
                <svg
                  class="w-4 h-4 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="#141414"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
              <input
                v-model="searchBarValue"
                @input="searchMovie()"
                id="search"
                class="block w-full p-2 ps-10 text-sm rounded-lg bg-gray-300 outline-none text-gray-800"
                placeholder="Search"
                autocomplete="off"
                required
              />
              <button
                type="button"
                class="absolute end-2 bottom-2 cursor-pointer"
                @click="closeSearch()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2d2d2d"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </form>

          <ul
            v-if="searchResult && searchResult.length >= 1"
            class="absolute top-15 border p-2 rounded-lg bg-gray-300 text-gray-600 font-medium max-h-1/3 overflow-y-scroll"
          >
            <li
              v-for="movie in searchResult"
              :key="movie.id"
              @click="(movieModal.openMovieModal(movie.id), closeSearch())"
              class="px-1 py-2 cursor-pointer hover:text-gray-800"
            >
              {{ movie.title }}
            </li>
          </ul>
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
