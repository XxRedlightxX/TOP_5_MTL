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
  import { CalendarComponent } from '@syncfusion/ej2-vue-calendars';

// Register the component globally
  const isMultiSelection = ref(true);
  const dateValue = ref(new Date("08/18/2022"));
  const minDate = ref(new Date("08/08/2022"));
  const maxDate = ref(new Date("08/26/2022"));

 
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

<style src="./styles/settings.scss">

</style>
