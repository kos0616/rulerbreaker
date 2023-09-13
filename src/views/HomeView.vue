<script setup lang="ts">
import banner from '../components/homeBanner.vue';
import correctionScreen from '../components/correctionScreen.vue';
import a4Test from '@/components/a4Test.vue';
import myFooter from '../components/myFooter.vue';
</script>

<template>
  <main id="home">
    <banner></banner>
    <correctionScreen id="correction" class="border-b pb-20"></correctionScreen>
    <a4Test id="sizing"></a4Test>
    <myFooter></myFooter>
  </main>
</template>
