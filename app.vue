<template>
    <NuxtPage />
</template>
<script setup>
useHead({
    htmlAttrs: {
        lang: 'en'

    }
})
</script>
<style>
.slide-from-left-enter-active,
.slide-from-left-leave-active {
    @apply transition duration-700 ease-in-out;
}
.slide-from-left-enter-from,
.slide-from-left-leave-to {
    @apply -translate-x-full;
}

.fade-enter-active,
.fade-leave-active {
    @apply transition duration-200 ease-linear;
}

.fade-enter-from,
.fade-leave-to {
    @apply opacity-0;
}
</style>
