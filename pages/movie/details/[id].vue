<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; 

const config = useRuntimeConfig();
const OMDB_API_KEY = config.public.OMDB_API_KEY; 

const movie = ref(null); 
const loading = ref(true); 
const error = ref(null); 

const route = useRoute(); 

const movieId = ref(route.params.id); 

const fetchMovieDetails = async () => {
    loading.value = true;
    error.value = null;
    movie.value = null; 

    if (!movieId.value) {
        error.value = "No movie ID provided in the URL. Please go back and select a movie.";
        loading.value = false;
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${movieId.value}&plot=full&apikey=${OMDB_API_KEY}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.Response === "True") {
            movie.value = data; 
        } else {
            error.value = data.Error || "Movie not found. The ID might be incorrect.";
        }
    } catch (err) {
        error.value = err.message; 
    } finally {
        loading.value = false; 
    }
};

onMounted(fetchMovieDetails);

watch(() => route.params.id, (newId) => {
    movieId.value = newId; 
    fetchMovieDetails(); 
});
</script>

<template>
    <main class="container mx-auto p-4 md:p-8 text-white" aria-label="Movie Details Page">
        <BackButton /> 

        <MovieDetailsSkeleton v-if="loading" /> 

        <div v-else-if="error" class="text-center p-8 text-red-500 text-lg">
            <p>Error: {{ error }}</p>
            <BackButton /> 
        </div>

        <MovieDetails v-else-if="movie" :movie="movie" /> 

        <div v-else class="text-center p-8 text-white text-lg">
            <p>No movie data available. Please try again or check the movie ID.</p>
            <BackButton /> 
        </div>
    </main>
</template>

<style scoped>
</style>