<template>
    <div id="profileListEventComponent">
      <div class="head glass">
        <h4>{{  actualLang ? 'List of event you add' : 'Les evenements que vous avez ajoute' }}</h4>
        
        <router-link to="/Add Event" class="router">
            <v-icon icon="mdi-plus-box-multiple" :class="['icon', {'justGlowless' : !actualMode}]" :title="actualLang ? 'Add an Event' : 'Ajouter un evenement'"/>
        </router-link>

      </div>
  
      <div class="body">
        <ProfileSingleEvent v-for="(item, index) in theOrganisator.listEvent" :key="index" :event="item"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import storageManager from "@/JS/LocalStaorageManager";
  import { ref, onMounted, onUnmounted } from "vue";
  import ProfileSingleEvent from "./ProfileSingleEventComponent.vue";
  
  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  const organisator = {
      avatar: "/src/assets/p1.jpg",
      username: "Debrazer",
      desc: text,
      listEvent: [
        { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
        { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
        { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
        { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 },
        { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 }
      ]
    };
  
  let actualLang = ref(storageManager.getLang());
  let isLogged = ref(storageManager.getLogin());
  let theOrganisator = ref(storageManager.getOrganisator());
  
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
  
  if (theOrganisator.value === null) {
    theOrganisator.value = organisator;
  }
  
  // Function to handle mode change event
  const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
  };
  
  // Function to handle mode change event
  const handleLoginChange = (event) => {
    isLogged.value = JSON.parse(event.detail.storage);
  };
  
  // Function to handle mode change event
  const handleOrganisatorChange = (event) => {
    theOrganisator.value = JSON.parse(event.detail.storage);
  };
  
  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
    window.addEventListener('login-changed', handleLoginChange);
    window.addEventListener('organisator-changed', handleOrganisatorChange);
  });
  
  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
    window.removeEventListener('login-changed', handleLoginChange);
    window.removeEventListener('organisator-changed', handleOrganisatorChange);
  });
  
  console.log(theOrganisator.value);
  </script>
  

<style src="../../styles/ProfilesStyles/profileListEventComponentStyle.scss"></style>