import { defineStore } from 'pinia'
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

        if (!cachedList || !(await this.isMovieListValid(listName, cachedList))) {
          this.fetchUserMovieList(listName)
        } else {
          this.user.movieLists[listName] = cachedList
        }
      }
    },

    async isMovieListValid(listName, cachedList) {
      const freshFirstPage = await this.fetchUserMovieListPage(listName, 1)

      return (
        freshFirstPage.total_results === cachedList.movies.length &&
        freshFirstPage.results[0] === cachedList.movies[0]
      )
    },

    async fetchUserMovieListPage(listName, page) {
      try {
        const res = await apiClient.get(`/account/${this.user.id}/${listName}/movies`, {
          params: { page: page, sort_by: 'created_at.desc' },
        })

        return res.data
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des films la liste : ${listName}, page : ${page}`,
          error,
        )
        return []
      }
    },

    async fetchUserMovieList(listName) {
      let allMovies = []
      let page = 1
      let totalPages = 1

      while (page <= totalPages) {
        const freshFirstPage = await this.fetchUserMovieListPage(listName, page)

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
  },
})
