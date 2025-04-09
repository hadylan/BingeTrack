import { defineStore } from 'pinia'
import apiClient from '@/services/apiClient'
import { useMovieModalStore } from './useMovieModalStore'

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
    async retrieveUserMovieLists() {
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
        freshFirstPage.results[0].id === cachedList.movies[0].id
      )
    },

    async fetchUserMovieListPage(listName, page) {
      try {
        const res = await apiClient.get(`/account/${this.user.id}/${listName}/movies`, {
          params: { page: page, sort_by: 'created_at.desc', language: 'fr-FR' },
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

    async rateMovie(rating) {
      const movieModalStore = useMovieModalStore()
      const movie = movieModalStore.movie

      try {
        await apiClient.post(`/movie/${movie.id}/rating?session_id=${this.user.session_id}`, {
          value: rating * 2,
        })

        const watchlistMovieIndex = this.user.movieLists.watchlist.movies.findIndex(
          (mov) => mov.id === movie.id,
        )
        if (watchlistMovieIndex >= 0) {
          this.user.movieLists.watchlist.movies.splice(watchlistMovieIndex, 1)
          localStorage.setItem('watchlist', JSON.stringify(this.user.movieLists.watchlist))
        }

        const ratedMovieIndex = this.user.movieLists.rated.movies.findIndex(
          (mov) => mov.id === movie.id,
        )
        if (ratedMovieIndex >= 0) {
          this.user.movieLists.rated.movies[ratedMovieIndex].rating = rating * 2
        } else {
          this.user.movieLists.rated.movies.unshift({
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            rating: rating * 2,
          })
        }

        localStorage.setItem('rated', JSON.stringify(this.user.movieLists.rated))

        const favoriteMovieIndex = this.user.movieLists.favorite.movies.findIndex(
          (mov) => mov.id === movie.id,
        )
        if (favoriteMovieIndex >= 0) {
          this.user.movieLists.favorite.movies[favoriteMovieIndex].rating = rating * 2
          localStorage.setItem('favorite', JSON.stringify(this.user.movieLists.favorite))
        }
      } catch (error) {
        console.error('Erreur lors de la notation du film', error)
      }
    },

    async toggleMovieInWatchlist() {
      try {
        const movieModalStore = useMovieModalStore()
        const movie = movieModalStore.movie

        await apiClient.post(`account/account_id/watchlist?session_id=${this.user.session_id}`, {
          media_type: 'movie',
          media_id: movie.id,
          watchlist: !movieModalStore.movie.isInWatchlist,
        })

        if (movieModalStore.movie.isInWatchlist === false) {
          this.user.movieLists.watchlist.movies.unshift({
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            rating: movie.rating,
          })
        } else {
          const watchlistMovieIndex = this.user.movieLists.watchlist.movies.findIndex(
            (mov) => mov.id === movie.id,
          )
          this.user.movieLists.watchlist.movies.splice(watchlistMovieIndex, 1)
        }

        movieModalStore.movie.isInWatchlist = !movieModalStore.movie.isInWatchlist
        localStorage.setItem('watchlist', JSON.stringify(this.user.movieLists.watchlist))
      } catch (error) {
        console.error("Erreur lors de l'ajout / de la suppression du film dans la watchlist", error)
      }
    },

    async toggleMovieInFavorites() {
      try {
        const movieModalStore = useMovieModalStore()
        const movie = movieModalStore.movie

        await apiClient.post(`account/account_id/favorite?session_id=${this.user.session_id}`, {
          media_type: 'movie',
          media_id: movie.id,
          favorite: !movieModalStore.movie.isFavorite,
        })

        if (movieModalStore.movie.isFavorite === false) {
          this.user.movieLists.favorite.movies.unshift({
            id: movie.id,
            poster_path: movie.poster_path,
            title: movie.title,
            rating: movie.rating,
          })
        } else {
          const watchlistMovieIndex = this.user.movieLists.favorite.movies.findIndex(
            (mov) => mov.id === movie.id,
          )
          this.user.movieLists.favorite.movies.splice(watchlistMovieIndex, 1)
        }

        movieModalStore.movie.isFavorite = !movieModalStore.movie.isFavorite
        localStorage.setItem('favorite', JSON.stringify(this.user.movieLists.favorite))
      } catch (error) {
        console.error("Erreur lors de l'ajout / la suppression du film des favoris", error)
      }
    },
  },
})
