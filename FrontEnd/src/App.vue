<template>
  <v-app>
    <v-main :class="actualMode ? 'light' : 'dark'">
      
      <Menu />
      <Notification/>
      <PopUp :is-show="toast.show" :message="toast.message"/>
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
  import { ref, onMounted, onUnmounted, reactive} from "vue";
  import Notification from "./components/NotificationComponent.vue";
  import PopUp from "./components/PopUpComponent.vue";

  let actualMode = ref(LocalStorageManager.getMode());

  if (actualMode.value === null) {
    LocalStorageManager.setMode(true);
    actualMode.value = LocalStorageManager.getMode();
  }

  const toast = reactive({
    show: false,
    message: ''
  })

// make function available for all components
  window.$toast = (msg) => {
    toast.message = msg
    toast.show = true
    setTimeout(() => toast.show = false, 2500)
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
