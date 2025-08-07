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
  import LocalStorageManager from "@/JS/LocalStaorageManager"
  import { ref, onMounted, onUnmounted} from "vue";
  import { useAuthStore } from "./stores/auth";



  // Register the component globally
  const isMultiSelection = ref(true);
  const dateValue = ref(new Date("08/18/2022"));
  const minDate = ref(new Date("08/08/2022"));
  const maxDate = ref(new Date("08/26/2022"));

  let actualMode = ref(LocalStorageManager.getMode());

  if (actualMode.value === null) {
    LocalStorageManager.setMode(true);
    actualMode.value = LocalStorageManager.getMode();
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

  //const pinia = createPinia()
  //app.use(pinia)
</script>

<style src="./styles/settings.scss"></style>
