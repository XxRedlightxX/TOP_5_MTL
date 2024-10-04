<template>
  <v-app>
    <v-main :class="actualMode ? 'light' : 'dark'">
      <Menu />

      <router-view class="view"/>
      <Language/>
      <Footer />
    </v-main>
  </v-app>
</template>

<script setup>
  import Menu from "./components/MenuComponent.vue";
  import Footer from "./components/FooterComponent.vue";
  import Language from "./components/LanguageSetterComponent.vue";
  import storageManager from "@/JS/LocalStaorageManager"
  import { ref, onMounted, onUnmounted} from "vue";

  let actualMode = ref(storageManager.getMode());

  if (actualMode.value === null) {
    storageManager.setMode(true);
    actualMode.value = storageManager.getMode();
  }

  // Function to handle mode change event
  const handleModeChange = (event) => {
    actualMode.value = JSON.parse(event.detail.storage);
  };

  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener('mode-changed', handleModeChange);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('mode-changed', handleModeChange);
  });
</script>

<style src="./styles/settings.scss"></style>
