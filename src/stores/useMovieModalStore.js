import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useMoviesStore } from './useMoviesStore'
import { useUserStore } from './useUserStore'
import { useReviewsStore } from './useReviewsStore'

export const useMovieModalStore = defineStore('movieModal', () => {
  const movieStore = useMoviesStore()
  const userStore = useUserStore()
  const reviewsStore = useReviewsStore()

  const isOpen = ref(false)
  const movie = ref(null)
  const reviews = ref(null)

  async function openMovieModal(selectedMovieId) {
    movie.value = await movieStore.fetchMovieDetail(selectedMovieId)
    reviews.value = await reviewsStore.fetchMovieReviews(movie.value.id)
    movie.value.isFavorite = userStore.user.movieLists.favorite.movies.some(
      (mov) => mov.id === selectedMovieId,
    )
    movie.value.isInWatchlist = userStore.user.movieLists.watchlist.movies.some(
      (mov) => mov.id === selectedMovieId,
    )
    const ratedMovie = userStore.user.movieLists.rated.movies.find(
      (mov) => mov.id === selectedMovieId,
    )
    if (ratedMovie) {
      movie.value.userRating = ratedMovie.rating
    }
    isOpen.value = true
  }

  function closeMovieModal() {
    movie.value = null
    isOpen.value = false
  }

  return { isOpen, movie, reviews, openMovieModal, closeMovieModal }
})
