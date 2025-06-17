<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <section class="flex flex-col md:flex-row items-center md:items-start bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 border border-gray-700">
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/000000/FFFFFF?text=No+Poster'"
      :alt="`Poster for ${movie.Title}`"
      class="w-64 h-96 md:w-80 md:h-auto rounded-lg shadow-lg mb-6 md:mb-0 md:mr-8 flex-shrink-0 aspect-[2/3]"
      @error="($event) => { $event.target.onerror = null; $event.target.src = 'https://placehold.co/300x450/000000/FFFFFF?text=No+Poster'; }"
    />
    <div class="flex-grow">
      <h1 class="text-4xl sm:text-5xl font-bold mb-3 text-red-600 leading-tight">{{ movie.Title }}</h1>
      <p class="text-gray-400 text-lg sm:text-xl mb-3">({{ movie.Year }})</p>
      <p class="text-yellow-500 text-2xl font-semibold mb-5 flex items-center">
        <span class="mr-2">⭐</span> {{ movie.imdbRating }} / 10 <span class="text-gray-400 text-base ml-2">({{ movie.imdbVotes }} votes)</span>
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-gray-300 text-base">
        <p><strong>Genre:</strong> {{ movie.Genre }}</p>
        <p><strong>Runtime:</strong> {{ movie.Runtime }}</p>
        <p><strong>Director:</strong> {{ movie.Director }}</p>
        <p><strong>Writer:</strong> {{ movie.Writer }}</p>
        <p><strong>Actors:</strong> {{ movie.Actors }}</p>
        <p><strong>Language:</strong> {{ movie.Language }}</p>
        <p><strong>Country:</strong> {{ movie.Country }}</p>
        <p><strong>Released:</strong> {{ movie.Released }}</p>
      </div>

      <h2 class="text-2xl font-bold mb-3 text-red-500">Plot</h2>
      <p class="text-gray-200 leading-relaxed mb-6">{{ movie.Plot }}</p>

      <template v-if="movie.Awards !== 'N/A'">
        <h2 class="text-2xl font-bold mb-3 text-red-500">Awards</h2>
        <p class="text-gray-200 leading-relaxed mb-6">{{ movie.Awards }}</p>
      </template>

      <template v-if="movie.BoxOffice !== 'N/A'">
        <h2 class="text-2xl font-bold mb-3 text-red-500">Box Office</h2>
        <p class="text-gray-200 leading-relaxed">{{ movie.BoxOffice }}</p>
      </template>
    </div>
  </section>
</template>