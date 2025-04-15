import apiClient from '@/services/apiClient'
import { getHoursDiffWithNow } from '@/services/utils'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movieLists: {
      nowPlaying: {
        id: 0,
        apiPath: '/movie/now_playing',
        title: 'Actuellement au cinéma',
        loadedPages: 0,
        totalPages: 0,
        firstPageFetchDate: null,
        movies: [],
      },
      trending: {
        id: 1,
        apiPath: 'trending/movie/week',
        title: 'Tendance cette semaine',
        loadedPages: 0,
        totalPages: 0,
        firstPageFetchDate: null,
        movies: [],
      },
      topRated: {
        id: 2,
        apiPath: '/movie/top_rated',
        title: 'Les mieux notés',
        loadedPages: 0,
        totalPages: 0,
        firstPageFetchDate: null,
        movies: [],
      },
      upcoming: {
        id: 3,
        apiPath: '/movie/upcoming',
        title: 'Prochainement disponibles',
        loadedPages: 0,
        totalPages: 0,
        firstPageFetchDate: null,
        movies: [],
      },
    },
  }),

  actions: {
    async retrieveMovieLists() {
      let cachedMovies = JSON.parse(localStorage.getItem('trending'))

      if (!cachedMovies || getHoursDiffWithNow(cachedMovies.firstPageFetchDate) >= 6) {
        for (const listKey of Object.keys(this.movieLists)) {
          await this.fetchMovieList(listKey, 1)
          await this.fetchMovieList(listKey, 2)
        }
      } else {
        for (const listKey of Object.keys(this.movieLists)) {
          cachedMovies = JSON.parse(localStorage.getItem(listKey))

          this.movieLists[listKey].movies = cachedMovies.movies
          this.movieLists[listKey].loadedPages = cachedMovies.loadedPages
          this.movieLists[listKey].totalPages = cachedMovies.totalPages
          this.movieLists[listKey].firstPageFetchDate = cachedMovies.firstPageFetchDate
        }
      }
    },

    async fetchMovieList(listKey, page) {
      try {
        const res = await apiClient.get(`${this.movieLists[listKey].apiPath}`, {
          params: { page: page, language: 'fr-FR' },
        })

        if (page === 1) {
          this.movieLists[listKey].firstPageFetchDate = Date.now()
          this.movieLists[listKey].totalPages = res.data.total_pages
          this.movieLists[listKey].movies = res.data.results
        } else {
          this.movieLists[listKey].movies.push(...res.data.results)
        }

        this.movieLists[listKey].loadedPages = res.data.page

        localStorage.setItem(listKey, JSON.stringify(this.movieLists[listKey]))
      } catch (error) {
        console.error(`Erreur lors de la récupération des films de la liste : ${listKey}`, error)
      }
    },

    async fetchMovieDetail(movieId) {
      try {
        const res = await apiClient.get(`movie/${movieId}`, {
          params: { language: 'fr-FR' },
        })

        return res.data
      } catch (error) {
        console.error(`Erreur lors de la récupération des détails du film : ${movieId}`, error)
      }
    },

    async searchMovieByName(search) {
      try {
        const res = await apiClient.get('search/movie', {
          params: {
            query: search,
            language: 'fr-FR',
          },
        })

        return res.data.results
      } catch (error) {
        console.error('Erreur lors de la recherche de film', error)
      }
    },
  },
})
