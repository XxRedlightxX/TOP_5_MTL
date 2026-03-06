<template>
  <v-app>
    <v-main :class="actualMode ? 'light' : 'dark'">
      <Menu />
      <router-view class="view"/>
      <Language />
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
  import { onMounted, onUnmounted, ref } from 'vue'
  import Footer from '@/components/StaticComponents/FooterComponent.vue';
  import Language from './components/StaticComponents/LanguageComponent.vue';
  import Menu from './components/StaticComponents/MenuComponent.vue';
  import Setup from './JS/Setup';

  let actualMode = Setup.modeSetup();
</script>

<style src="./styles/settings.scss"></style>
