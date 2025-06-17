<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goBackToList = () => {
    router.push('/');
};
</script>

<template>
    <button
        @click="goBackToList"
        class="mb-6 px-6 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition duration-300 shadow-md flex items-center group"
        aria-label="Back to movie list"
    >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to Movies
    </button>
</template>