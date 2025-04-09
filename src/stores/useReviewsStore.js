import apiClient from '@/services/apiClient'
import { getHoursDiffWithNow, stripHtml } from '@/services/utils'
import { defineStore } from 'pinia'

export const useReviewsStore = defineStore('review', {
  state: () => ({
    trendingReviews: { lastUpdate: null, reviews: [] },
    reviews: new Map(),
  }),

  actions: {
    async getTrendingReviews(trendingMovies) {
      const reviews = []
      const cachedTrendingReviews = JSON.parse(localStorage.getItem('trendingReviews'))

      if (!cachedTrendingReviews || getHoursDiffWithNow(cachedTrendingReviews.lastUpdate) >= 24) {
        for (let i = 0; i < trendingMovies.length; i++) {
          try {
            const res = await apiClient.get(`/movie/${trendingMovies[i].id}/reviews`)
            if (!res.data.results[0]) {
              continue
            }

            res.data.results[0].content = stripHtml(res.data.results[0].content)
            res.data.results[0].movie_poster_path = trendingMovies[i].poster_path
            res.data.results[0].movie_title = trendingMovies[i].title
            reviews.push(res.data.results[0])

            if (reviews.length === 6) {
              this.trendingReviews.lastUpdate = Date.now()
              this.trendingReviews.reviews = reviews
              localStorage.setItem('trendingReviews', JSON.stringify(this.trendingReviews))
              break
            }
          } catch (error) {
            console.error(
              `Erreur lors de la récupération des critiques du film : ${trendingMovies[i].id}`,
              error,
            )
          }
        }
      } else {
        this.trendingReviews = cachedTrendingReviews
      }
    },

    async fetchMovieReviews(movieId) {
      try {
        const res = await apiClient.get(`movie/${movieId}/reviews`)
        for (const review of res.data.results) {
          review.content = stripHtml(review.content)
        }
        return res.data
      } catch (error) {
        console.error(`Erreur lors de la récupération des critiques du film : ${movieId}`, error)
      }
    },
  },
})
