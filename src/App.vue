<script setup lang="ts">
import AddToHome from './components/AddToHome.vue';
import { RouterView } from 'vue-router';
import initNetworkStatus from './API/initNetworkStatus';
initNetworkStatus();
</script>

<template>
  <AddToHome />
  <header class="sticky top-0 z-20 bg-[color:var(--color-header)]">
    <div class="container mx-auto flex">
      <router-link to="/" class="mr-auto">
        <h1 class="brand text-white">RULER BREAKER</h1>
      </router-link>
      <nav class="flex items-center">
        <a href="#home" class="home-nav-link">Home</a>
        <a href="#correction" class="home-nav-link">校正</a>
        <a href="#sizing" class="home-nav-link">測量</a>
        <!-- <a href="#contact" class="home-nav-link"></a> -->
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style lang="postcss">
.brand {
  @apply tracking-wide first-letter:text-xl first-letter:font-bold first-letter:text-primary;
}

.home-nav-link {
  @apply mx-1 p-1;

  &:hover {
    @apply text-gray-400 transition-colors duration-300 dark:text-white;
  }
  &.router-link-exact-active {
    @apply text-primary;
  }
}
</style>
