import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthModalOpen = ref(false)

  const toggleAuthModal = () => {
    isAuthModalOpen.value = !isAuthModalOpen.value
  }

  return { isAuthModalOpen, toggleAuthModal }
})
