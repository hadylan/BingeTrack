import { defineStore } from 'pinia'
import { useUIStore } from './useUIStore'
import { useUserStore } from './useUserStore'
import router from '@/router'
import apiClient from '@/services/apiClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    sessionId: null,
  }),

  actions: {
    async checkUserSession() {
      const cookieSessionId = document.cookie
        ?.split('; ')
        .find((row) => row.startsWith('session_id'))
        ?.split('=')[1]

      if (!cookieSessionId) {
        return
      }

      this.sessionId = cookieSessionId
      await this.retrieveUserDetails()
    },

    async retrieveUserDetails() {
      try {
        const res = await apiClient.get(`/account/account_id?session_id=${this.sessionId}`)
        const userStore = useUserStore()

        userStore.user.session_id = this.sessionId
        userStore.user.id = res.data.id
        userStore.user.username = res.data.username

        document.cookie = `session_id=${this.sessionId}; path=/; max-age=604800`

        const uiStore = useUIStore()
        uiStore.closeAuthModal()
      } catch (error) {
        console.error(
          'Erreur lors de la récupération des informations utilisateur TMDB :',
          error.message,
        )
      }
    },

    async createSession(requestToken) {
      try {
        const result = await apiClient.post('/authentication/session/new', {
          request_token: requestToken,
        })

        this.sessionId = result.data.session_id
        await this.retrieveUserDetails()
      } catch (error) {
        console.error('Erreur lors de la création de la session TMDB :', error.message)
      }
    },

    async TMDBLogin() {
      try {
        // retrieve request token from TMDB
        const result = await apiClient.get('/authentication/token/new')

        const requestToken = await result.data.request_token

        // open a new window to ask user permission
        const authWindow = window.open(
          `https://www.themoviedb.org/authenticate/${requestToken}`,
          '_blank',
        )

        const authWindowInterval = setInterval(async () => {
          if (authWindow.closed) {
            clearInterval(authWindowInterval)
            await this.createSession(requestToken)
          }
        }, 1000)
      } catch (error) {
        console.error("Erreur lors de l'authentification TMDB :", error.message)
      }
    },

    logout() {
      this.sessionId = null
      document.cookie = 'session_id=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'

      const userStore = useUserStore()
      userStore.user.session_id = null
      userStore.user.id = null
      userStore.user.username = null

      router.push({ name: 'home' })
    },
  },
})
