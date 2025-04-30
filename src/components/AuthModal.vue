<script setup>
import tmdbLogo from '@/assets/tmdb_logo.svg'
import { useUIStore } from '@/stores/useUIStore'
import { useAuthStore } from '@/stores/useAuthStore'

const uiStore = useUIStore()
const authStore = useAuthStore()
</script>

<template>
  <div
    id="auth_modal"
    data-modal-backdrop="static"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full"
    @click.self="uiStore.closeAuthModal()"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div id="auth_modal_content" class="relative rounded-lg shadow-sm">
        <div class="flex items-center justify-between p-4 md:p-5 border-b">
          <h3 class="text-xl font-semibold text-white">Identifiez-vous</h3>
          <button
            @click="uiStore.closeAuthModal()"
            type="button"
            class="text-white bg-transparent hover:bg-neutral-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Fermer la modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <p class="text-base leading-relaxed text-gray-300 mb-5">
            Pour vous connecter à notre application, vous devez utiliser le système
            d'authentification de TMDB (The Movie Database). <br /><br />
            Ce processus très rapide vous permet d'accéder à vos listes de films et préférences en
            toute sécurité. Lors de l'authentification, vous serez redirigé vers TMDB pour approuver
            l'accès, puis vous reviendrez automatiquement sur notre plateforme. 🚀
          </p>

          <span class="text-orange-400 block"
            >Pensez à fermer la fenêtre TMDB après l'autorisation pour permettre
            l'authentification.</span
          >

          <button
            id="tmdb_auth_button"
            type="button"
            class="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-900 border font-medium rounded-lg text-sm px-5 mx-auto py-2.5 mt-3 text-center inline-flex items-center cursor-pointer"
            @click="authStore.TMDBLogin()"
          >
            <img :src="tmdbLogo" alt="the movie database logo" class="mr-4" id="tmdb_logo" />
            S'identifier avec TMDB
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#auth_modal {
  background-color: rgba(0, 0, 0, 0.7);
}

#auth_modal_content {
  background-color: #1d1d1d;
}

#tmdb_logo {
  width: 30px;
}
</style>
