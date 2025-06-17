<script setup>
defineProps({
  movie: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <NuxtLink
    :to="`/movie/details/${movie.imdbID}`"
    :aria-label="`View details for ${movie.Title}`"
    class="relative rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 group block"
  >
    <img
      :src="movie.Poster !== 'N/A' ? movie.Poster : 'https://placehold.co/300x450/000000/FFFFFF?text=No+Poster'"
      :alt="`Poster for ${movie.Title}`"
      class="w-full h-full object-cover aspect-[2/3]"
      @error="($event) => { $event.target.onerror = null; $event.target.src = 'https://placehold.co/300x450/000000/FFFFFF?text=No+Poster'; }"
    />
    <div class="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent text-white text-center text-sm font-semibold opacity-100 group-hover:opacity-100 transition-opacity duration-300">
      {{ movie.Title }}
    </div>
  </NuxtLink>
</template>