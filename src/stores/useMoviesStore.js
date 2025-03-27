import apiClient from '@/services/apiClient'
import { getHoursDiffWithNow } from '@/services/utils'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieLists: {
      trending: {
        id: 0,
        apiPath: 'trending/movie/week',
        title: 'Tendance cette semaine',
        lastUpdate: null,
        movies: [],
      },
      nowPlaying: {
        id: 1,
        apiPath: '/movie/now_playing',
        title: 'Actuellement au cinéma',
        lastUpdate: null,
        movies: [],
      },
      topRated: {
        id: 2,
        apiPath: '/movie/top_rated',
        title: 'Les mieux notés',
        lastUpdate: null,
        movies: [],
      },
      upcoming: {
        id: 3,
        apiPath: '/movie/upcomping',
        title: 'Prochainement disponibles',
        lastUpdate: null,
        movies: [],
      },
    },
  }),

  actions: {
    async fetchMovieList(list) {
      const listKey = Object.keys(this.movieLists).find(
        (key) => this.movieLists[key].id === list.id,
      )
      const cachedMovies = JSON.parse(localStorage.getItem(list.apiPath))

      if (!cachedMovies || getHoursDiffWithNow(cachedMovies.lastUpdate) >= 24) {
        try {
          const res = await apiClient.get(`${list.apiPath}`)
          this.movieLists[listKey].lastUpdate = Date.now()
          this.movieLists[listKey].movies = res.data.results
          localStorage.setItem(list.apiPath, JSON.stringify(this.movieLists[listKey]))
        } catch (error) {
          console.error(
            `Erreur lors de la récupération des films de la liste : ${list.title}`,
            error,
          )
        }
      } else {
        this.movieLists[listKey].movies = cachedMovies.movies
        this.movieLists[listKey].lastUpdate = cachedMovies.lastUpdate
      }
    },
  },
})
