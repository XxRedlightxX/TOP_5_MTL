<template>
    <div id="profileListEventComponent">
      <div class="head">
        <h4 v-if="props.himself">{{  actualLang ? 'List of event you add' : 'Les evenements que vous avez ajoute' }}</h4>
        <h4 v-else>{{  actualLang ? 'List of event the organisator publish' : 'Les evenements que l\'organisateur a publier' }}</h4>
        
        <router-link to="/Add Event" class="router"  v-show="props.himself">
            <v-icon icon="mdi-plus-box-multiple" class="icon" :title="actualLang ? 'Add an Event' : 'Ajouter un evenement'"/>
        </router-link>

      </div>
  
      <div class="body">
        <ProfileSingleEvent v-for="(item, index) in props.user.listEvent" :key="index" :event="item"  :himself="props.himself"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import storageManager from "@/JS/LocalStaorageManager";
  import { ref, onMounted, onUnmounted, defineProps } from "vue";
  import ProfileSingleEvent from "./ProfileSingleEventComponent.vue";

  const props = defineProps({
        himself: Boolean, // Boolean type prop
        user: Object
    });

  
  let actualLang = ref(storageManager.getLang());
  let isLogged = ref(storageManager.getLogin());
  
  const Logout = () => {
    storageManager.setLogin(false);
    isLogged.value = storageManager.getLogin();
  };
  
  if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
  }
  
  if (isLogged.value === null) {
    Logout();
  }
  
  // Function to handle mode change event
  const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
  };
  
  // Function to handle mode change event
  const handleLoginChange = (event) => {
    isLogged.value = JSON.parse(event.detail.storage);
  };
  

  
  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
    window.addEventListener('login-changed', handleLoginChange);
  });
  
  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
    window.removeEventListener('login-changed', handleLoginChange);
  });
  
  </script>
  

<style src="../../styles/ProfilesStyles/profileListEventComponentStyle.scss"></style>