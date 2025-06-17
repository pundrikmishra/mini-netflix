<template>
    <div class="container mx-auto p-4 md:p-8" aria-label="Movie List Page Content">
        <section v-if="loading"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <MovieCardSkeleton v-for="n in 6" :key="n" />
        </section>

        <div v-else-if="error" class="text-center p-8 text-red-500 text-lg">
            <p>Error: {{ error }}. Please ensure your OMDb API key in .env is correct and you have an active internet
                connection.</p>
        </div>

        <section v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            <MovieCard v-for="movie in movies" :key="movie.imdbID" :movie="movie" />
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const config = useRuntimeConfig();
const OMDB_API_KEY = config.public.OMDB_API_KEY;

const POPULAR_MOVIE_IDS = [
    'tt1375666',
    'tt0468569',
    'tt0816692',
    'tt0110912',
    'tt0109830',
    'tt0133093',
    'tt0111161',
    'tt0068646',
];

const movies = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        const fetchedMovies = [];
        for (const imdbID of POPULAR_MOVIE_IDS) {
            try {
                const url = `https://www.omdbapi.com/?i=${imdbID}&plot=short&apikey=${OMDB_API_KEY}`;

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                if (data.Response === "True") {
                    fetchedMovies.push(data);
                } else {
                    console.warn(`Could not fetch details for IMDb ID ${imdbID}: ${data.Error}`);
                }
            } catch (innerErr) {
                console.warn(`Error fetching single movie ${imdbID}: ${innerErr.message}`);
            }
        }
        movies.value = fetchedMovies;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped></style>