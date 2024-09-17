<template>
  <v-app>
    <v-main>
      <Menu />

      <router-view class="view"/>
      
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
  import Menu from "./components/MenuComponent.vue";
  import Footer from "./components/FooterComponent.vue";
</script>

<style src="../../src/styles/settings.scss"></style>
