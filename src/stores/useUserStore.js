import { defineStore } from 'pinia'
import { getUserMovies } from '@/services/tmdbService'
import getHoursDiffWithNow from '@/services/utils'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
      id: null,
      username: null,
      session_id: null,
      moviesLists: {
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
      for (const listName of Object.keys(this.user.moviesLists)) {
        const cachedList = JSON.parse(localStorage.getItem(listName))

        if (!cachedList || !(await this.isMoviesListValid(listName, cachedList))) {
          this.getFreshMoviesList(listName)
        } else {
          this.user.moviesLists[listName] = cachedList
        }
      }
    },

    async isMoviesListValid(listName, cachedList) {
      const cachedLastUpdate = cachedList.lastUpdate

      if (getHoursDiffWithNow(cachedLastUpdate) >= 3) {
        return false
      }

      const freshFirstPage = await getUserMovies(this.user.id, listName, 1)

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
        const freshFirstPage = await getUserMovies(this.user.id, listName, page)

        if (page === 1) {
          totalPages = freshFirstPage.total_pages
        }

        allMovies.push(...freshFirstPage.results)
        page++
      }

      this.user.moviesLists[listName].lastUpdate = Date.now()
      this.user.moviesLists[listName].movies = allMovies
      localStorage.setItem(`${listName}`, JSON.stringify(this.user.moviesLists[listName]))
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
