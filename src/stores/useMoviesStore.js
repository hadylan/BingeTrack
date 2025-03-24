import apiClient from '@/services/apiClient'
import getHoursDiffWithNow from '@/services/utils'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    moviesLists: {
      popularThisWeek: {
        id: 0,
        title: 'Populaire cette semaine',
        lastUpdate: null,
        movies: [],
      },
      outNow: {
        id: 1,
        title: 'Actuellement au cinéma',
        lastUpdate: null,
        movies: [],
      },
      mostPopular: {
        id: 2,
        title: 'Les plus populaires',
        lastUpdate: null,
        movies: [],
      },
      highestRated: {
        id: 3,
        title: 'Les mieux notés',
        lastUpdate: null,
        movies: [],
      },
      upcomingReleases: {
        id: 4,
        title: 'Prochainement disponibles',
        lastUpdate: null,
        movies: [],
      },
    },
  }),

  actions: {
    async getPopularThisWeek() {
      const cachedMovies = JSON.parse(localStorage.getItem('popularTw'))

      if (!cachedMovies || getHoursDiffWithNow(cachedMovies.lastUpdate) >= 3) {
        try {
          const res = await apiClient.get('/movie/popular')
          this.moviesLists.popularThisWeek.lastUpdate = Date.now()
          this.moviesLists.popularThisWeek.movies = res.data.results
          localStorage.setItem('popularTw', JSON.stringify(this.moviesLists.popularThisWeek))
        } catch (error) {
          console.error('Erreur lors de la récupération des films populaires :', error)
        }
      } else {
        this.moviesLists.popularThisWeek.movies = cachedMovies.movies
        this.moviesLists.popularThisWeek.lastUpdate = cachedMovies.lastUpdate
      }
    },
  },
})
