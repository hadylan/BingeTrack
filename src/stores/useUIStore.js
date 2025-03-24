import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => ({
    isAuthModalOpen: false,
  }),
  actions: {
    openAuthModal() {
      this.isAuthModalOpen = true
    },
    closeAuthModal() {
      this.isAuthModalOpen = false
    },
  },
})
