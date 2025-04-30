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
    <ul
      v-if="trendingReviews.reviews.length > 2"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4"
    >
      <li
        v-for="review in trendingReviews.reviews"
        :key="review.id"
        class="h-[75vh] rounded-lg border-3 border-neutral-700"
      >
        <div class="h-full flex flex-col p-5 rounded-lg">
          <!-- Header -->
          <div class="review_header flex pb-7">
            <!-- Poster -->
            <div class="poster_wrapper hidden md:block w-2/3 md:w-1/3">
              <img
                class="h-full w-full"
                :src="'https://image.tmdb.org/t/p/w200' + review.movie_poster_path"
              />
            </div>

            <!-- Info -->
            <div class="md:ml-7 md:w-2/3">
              <h3 class="text-lg font-bold pb-5">{{ review.movie_title }}</h3>
              <div>
                <!-- Avatar -->
                <div class="avatar_wrapper">
                  <img
                    class="h-full w-full rounded-full"
                    :src="
                      review.author_details.avatar_path
                        ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                        : avatar
                    "
                  />
                </div>
                <span class="block mt-1">{{ review.author_details.username }}</span>
                <div v-if="review.author_details.rating" class="flex items-center font-bold">
                  ⭐ {{ (review.author_details.rating / 2).toFixed(1) }}/5
                </div>
              </div>
            </div>
          </div>

          <!-- 🧠 Le bloc qui prend le reste -->
          <div class="review_content flex-1 overflow-hidden py-3 rounded">
            <div class="h-full overflow-y-scroll overflow-hidden px-5">
              <p class="text-justify">{{ review.content }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>

    <div v-else class="flex justify-between space-x-5 pt-5">
      <div
        v-for="(item, index) in 3"
        :key="index"
        role="status"
        class="w-full rounded-sm shadow-sm animate-pulse md:p-6"
      >
        <div class="flex">
          <div
            class="flex items-center justify-center h-48 w-1/3 mb-4 bg-neutral-700 rounded-sm mr-5"
          >
            <svg
              class="w-10 h-10 text-neutral-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path
                d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"
              />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>

          <div class="mt-5">
            <div class="mb-10">
              <div class="h-2.5 bg-neutral-700 rounded-full w-50 mb-2"></div>
            </div>
            <div class="mt-4">
              <svg
                class="w-10 h-10 me-3 text-neutral-700 mb-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"
                />
              </svg>
              <div>
                <div class="h-2 bg-neutral-700 rounded-full w-32 mb-2"></div>
                <div class="w-1/2 h-2 bg-neutral-700 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="h-2 bg-neutral-700 rounded-full my-2.5"></div>
        <div class="h-2 bg-neutral-700 rounded-full mb-2.5"></div>
        <div class="h-2 bg-neutral-700 rounded-full mb-2.5"></div>
        <div class="h-2 bg-neutral-700 rounded-full mb-2.5"></div>
        <div class="h-2 bg-neutral-700 rounded-full mb-2.5"></div>
        <div class="h-2 bg-neutral-700 rounded-full"></div>

        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
  border: 2px solid rgb(218, 218, 218);
}

.avatar_wrapper {
  width: 35px;
  height: 35px;
}

.review_content {
  background-color: #343434;
}
</style>
