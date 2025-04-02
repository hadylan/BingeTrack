<script setup>
import { useUserStore } from '@/stores/useUserStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { storeToRefs } from 'pinia'
import UserMovieList from '@/components/UserMovieList.vue'

const authStore = useAuthStore()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <main>
    <div id="user_infos_container" class="rounded-xl p-5 mb-5 size-fit">
      <h2>
        Votre profil : <span class="font-semibold">{{ user.username }}</span>
      </h2>
      <button
        type="button"
        class="text-sm text-gray-400 bg-transparent cursor-pointer hover:text-gray-500"
        @click="authStore.logout()"
      >
        Se déconnecter
      </button>
    </div>

    <div class="movieLists">
      <UserMovieList
        v-for="movieList in user.movieLists"
        :key="movieList.id"
        :movieList="movieList"
        class="mb-5"
      />
    </div>
  </main>
</template>

<style scoped>
#user_infos_container {
  background-color: #202020;
}
</style>
