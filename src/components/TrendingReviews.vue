<script setup>
import { useReviewsStore } from '../stores/useReviewsStore'
import { storeToRefs } from 'pinia'
import avatar from '@/assets/avatar.jpg'

const reviewStore = useReviewsStore()
const { trendingReviews } = storeToRefs(reviewStore)
</script>

<template>
  <div class="review_list rounded-xl px-5 pt-4 pb-5">
    <h2 class="text-lg">Critiques de films en tendance</h2>
    <ul v-if="trendingReviews.reviews.length" class="grid grid-cols-3 gap-3 mt-4">
      <li
        v-for="review in trendingReviews.reviews"
        :key="review.id"
        class="rounded-xl border-3 border-neutral-700"
      >
        <div class="review_wrapper p-5 rounded-xl">
          <div class="review_header flex mb-5">
            <div class="poster_wrapper">
              <img
                :src="'https://image.tmdb.org/t/p/w500' + review.movie_poster_path"
                :alt="'Affiche du film : ' + review.movie_title"
                :title="review.movie_title"
                class="h-full w-full"
              />
            </div>
            <div class="ml-10">
              <h3 class="pb-8 text-lg font-medium">{{ review.movie_title }}</h3>

              <div>
                <div class="avatar_wrapper">
                  <img
                    class="h-full w-full rounded-full"
                    :src="
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w500${review.author_details.avatar_path}`
                        : avatar
                    "
                    :title="review.author_details.username"
                    :alt="'Avatar de l\'utilisateur : ' + review.author_details.username"
                  />
                </div>
                <span class="block mt-1">{{ review.author_details.username }}</span>
                <div v-if="review.author_details.rating" class="flex items-center">
                  <svg
                    class="w-4 h-4 text-yellow-300 me-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path
                      d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
                    />
                  </svg>
                  <span class="ms-2 text-sm font-bold text-gray-300 dark:text-white">
                    {{ review.author_details.rating }}/10
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="review_content h-100 overflow-scroll overflow-x-hidden mt-7">
            <p class="pr-5 text-justify">{{ review.content }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.review_list {
  background-color: #202020;
}

.review_wrapper {
  background-color: #0f0f0f;
}

.poster_wrapper {
  max-width: 150px;
  max-height: 225px;
  border: 2px solid rgb(35, 35, 35);
}

.avatar_wrapper {
  width: 35px;
  height: 35px;
}

.review_content {
  max-height: 25vh;
}
</style>
