import { defineStore } from 'pinia'
import getHoursDiffWithNow from '@/services/utils'
import apiClient from '@/services/apiClient'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: null,
      session_id: null,
      movieLists: {
        favorite: {
          id: 0,
          title: 'Films favoris',
          movies: [],
        },
        watchlist: {
          id: 1,
          title: 'Films à voir',
          movies: [],
        },
        rated: {
          id: 2,
          title: 'Films notés',
          movies: [],
        },
      },
    },
  }),

  actions: {
    async retrieveMoviesLists() {
      for (const listName of Object.keys(this.user.movieLists)) {
        const cachedList = JSON.parse(localStorage.getItem(listName))

        if (!cachedList || !(await this.isMoviesListValid(listName, cachedList))) {
          this.getFreshMoviesList(listName)
        } else {
          this.user.movieLists[listName] = cachedList
        }
      }
    },

    async getUserMovies(listName, page) {
      try {
        const res = await apiClient.get(`/account/${this.user.id}/${listName}/movies`, {
          params: { page: page, sort_by: 'created_at.desc' },
        })

        return res.data
      } catch (error) {
        console.error("Erreur lors de la récupération des films de l'utilisateur :", error)
        return []
      }
    },

    async isMoviesListValid(listName, cachedList) {
      const cachedLastUpdate = cachedList.lastUpdate

      if (getHoursDiffWithNow(cachedLastUpdate) >= 3) {
        return false
      }

      const freshFirstPage = await this.getUserMovies(listName, 1)

      return (
        freshFirstPage.total_results === cachedList.movies.length &&
        this.isSameFirstPageMovies(freshFirstPage.results, cachedList.movies.slice(0, 20))
      )
    },

    async getFreshMoviesList(listName) {
      let allMovies = []
      let page = 1
      let totalPages = 1

      while (page <= totalPages) {
        const freshFirstPage = await this.getUserMovies(listName, page)

        if (page === 1) {
          totalPages = freshFirstPage.total_pages
        }

        allMovies.push(...freshFirstPage.results)
        page++
      }

      this.user.movieLists[listName].lastUpdate = Date.now()
      this.user.movieLists[listName].movies = allMovies
      localStorage.setItem(`${listName}`, JSON.stringify(this.user.movieLists[listName]))
    },

    async isSameFirstPageMovies(freshFirstPage, cachedFirstPage) {
      const cachedIds = new Set(cachedFirstPage.map((movie) => movie.id))
      const freshIds = new Set(freshFirstPage.map((m) => m.id))

      const hasNoChanges = !(
        [...freshIds].some((id) => !cachedIds.has(id)) ||
        [...cachedIds].some((id) => !freshIds.has(id))
      )

      return hasNoChanges
    },
  },
})
