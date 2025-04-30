<script setup>
import { ref } from 'vue'
import { useMovieModalStore } from '@/stores/useMovieModalStore'
import StarRating from 'vue-star-rating'
import { useUserStore } from '@/stores/useUserStore'
import avatar from '@/assets/avatar.jpg'

const movieModalStore = useMovieModalStore()
const userStore = useUserStore()
const rating = ref(movieModalStore.movie.userRating / 2)
</script>

<template>
  <div
    id="movie_modal_wrapper"
    tabindex="-1"
    class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] h-full"
    @click.self="movieModalStore.closeMovieModal()"
  >
    <div class="relative p-4 w-full max-w-4xl max-h-full">
      <!-- Modal content -->
      <div
        id="movie_modal"
        class="relative rounded-lg shadow-sm p-3 flex flex-col justify-center items-center"
      >
        <!-- Movie infos -->
        <div id="movie_infos" class="flex justify-between p-2 rounded-lg">
          <div id="poster_wrapper" class="hidden md:block mr-5 w-1/3">
            <img
              :src="'https://image.tmdb.org/t/p/w200' + movieModalStore.movie.poster_path"
              alt=""
            />
          </div>
          <div class="md:w-2/3">
            <h3 class="text-3xl font-semibold mb-1">{{ movieModalStore.movie.title }}</h3>
            <p v-if="movieModalStore.movie.tagline">
              {{ movieModalStore.movie.tagline }}
            </p>

            <p class="mb-1 mt-7">{{ movieModalStore.movie.release_date.slice(0, 4) }}</p>
            <p class="mb-1">{{ movieModalStore.movie.runtime }} minutes</p>

            <p class="mb-7">
              {{ movieModalStore.movie.genres.map((genre) => genre.name).join(', ') }}
            </p>

            <p v-if="movieModalStore.movie.vote_average" class="font-semibold mb-7">
              ⭐ {{ (movieModalStore.movie.vote_average / 2).toFixed(1) }}/5
            </p>

            <p>{{ movieModalStore.movie.overview }}</p>
          </div>
        </div>

        <!-- Modal action buttons -->
        <div
          id="action_buttons"
          class="p-3 w-full md:w-1/2 mt-5 flex justify-around items-center rounded-lg"
        >
          <button class="m-0 cursor-pointer" @click="userStore.toggleMovieInWatchlist()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              :stroke="movieModalStore.movie.isInWatchlist ? '#0048ff' : '#ffffff'"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </button>

          <button class="mb-0 cursor-pointer" @click="userStore.toggleMovieInFavorites()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              :fill="movieModalStore.movie.isFavorite ? '#f72a2a' : 'none'"
              :stroke="!movieModalStore.movie.isFavorite ? '#ffffff' : 'none'"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              ></path>
            </svg>
          </button>

          <star-rating
            class="mb-1"
            :active-color="'#13ED2C'"
            v-bind:star-size="35"
            v-bind:increment="0.5"
            v-bind:max-rating="5"
            v-bind:show-rating="false"
            :rating="rating"
            @update:rating="userStore.rateMovie"
          />
        </div>

        <!-- Modal reviews -->
        <div
          class="movie_reviews p-8 rounded-lg mt-5 w-full"
          v-if="movieModalStore.reviews.results.length"
        >
          <div v-for="review in movieModalStore.reviews.results" :key="review.id">
            <div class="flex items-center">
              <img
                class="rounded-full review_user_avatar mr-3"
                :src="
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                    : avatar
                "
                :title="review.author_details.username"
                :alt="'Avatar de l\'utilisateur : ' + review.author_details.username"
              />
              <p class="font-semibold">
                {{ review.author_details.username }}
              </p>
              <hr />
            </div>
            <div class="mt-5">
              <p class="text-justify">{{ review.content }}</p>
            </div>
            <hr class="my-6" />
          </div>
        </div>

        <div v-else class="movie_reviews p-8 rounded-lg mt-5 w-full">
          <p class="text-center">Il n'y a pas encore d'avis sur ce film.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#movie_modal_wrapper {
  background-color: rgba(0, 0, 0, 0.772);
}

#movie_modal {
  background-color: rgb(22, 22, 22);
}

#movie_infos,
#action_buttons,
.movie_reviews {
  background-color: #1d1d1d;
}

.review_user_avatar {
  width: 40px;
  height: 40px;
}
</style>
