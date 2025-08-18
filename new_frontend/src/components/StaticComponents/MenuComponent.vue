<template>
  <v-app-bar id="menuComponent" :elevation="2">

    <transition name="slide">
      <div v-if="seeBurgermenu" :class="['allMenu', {'burgerLinks' : seeBurgermenu}]" @click.self="changeSeeBurgermenu()">
        <div class="smallMenu">
          <v-icon icon="mdi-window-close" :class="['icon', 'iconClose', {'justGlow' : !actualMode}]" @click="changeSeeBurgermenu()"/>
          <Logo :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'" :size="0" class="logoo"/> 

          <div class="links">
            <router-link to="/" :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'">{{actualLang ? 'Home' : 'Accueil'}}</router-link>
            <router-link to="/Events" :title="actualLang ? 'Go to Event Page' : 'Allez a la page d\'aEvenement'">{{actualLang ? 'Events' : 'Evenement'}}</router-link>
          </div>
          <div class="icons">
            <router-link to="/Profile" class="profile" :title="actualLang ? 'Go to Profile Page' : 'Allez a la page Profile'">
              <v-icon icon="mdi-account-circle" class="icon"/>
            </router-link>
            <v-icon 
              :icon="!actualMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" 
              :class="['icon', 'iconn', { 'justGlow': !actualMode }]" 
              @click="LocalStorageManager.changeMode()" 
              :title="actualLang ? (actualMode ? 'Go to Night Mode' : 'Go to Light Mode') : (actualMode ? 'Passez en mode Nuit' : 'Passez en mode Jour')"
            />

          </div>
        </div>
      </div>
    </transition>

    <div class="BurgerMenu">
      <input type="checkbox" name="showMenu" id="showMenu" v-model="seeBurgermenu">
      <label for="showMenu">
        <v-icon icon="mdi-menu" :class="['icon', {'justGlow' : !actualMode}]" @click="console.log(seeBurgermenu)"/>
      </label>
    </div>
  </v-app-bar>
</template>

<script setup>
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import Logo from '@/components/LogoComponent/LogoComponent.vue';
  import Setup from '@/JS/Setup.js';

  let actualMode = Setup.modeSetup();
  let actualLang = Setup.languageSetup();

  let lastScrollTop = 0;
  let seeBurgermenu = ref(true);
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  if (width.value <= 1025) {
    seeBurgermenu.value = false;
  }

  // Fonction pour mettre à jour les dimensions de la fenêtre
  function updateDimensions() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  const changeSeeBurgermenu = () => {
    console.log("click : " + width.value); // Utilisation de la valeur retournée
    if (width.value <= 1025) { // Vérification de la largeur
      seeBurgermenu.value = !seeBurgermenu.value;
    }
  }

  const handleScroll = () => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log("scroll : ", scrollTop)
    if (scrollTop > lastScrollTop && width.value >= 1025) {
      document.querySelector('#menuComponent').style.top = '-80px'; // Hide the navbar on scroll down
    } else if(scrollTop < lastScrollTop && width.value >= 1025) {
      document.querySelector('#menuComponent').style.top = '0px'; // Show the navbar on scroll up
    }
    lastScrollTop = scrollTop;
  };

  // Écouteur pour surveiller les changements de largeur
  watch(width, (newVal) => {
    if (newVal >= 1026) {
      seeBurgermenu.value = true;
      console.log('Retour plein écran :', newVal);
    }
  });
  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener('resize', updateDimensions);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener('resize', updateDimensions);
  });
</script>

<style src="../../styles//ComponentsStyles/StaticStyles/MenuStyle.scss"></style>
<style src="../../styles//ComponentsStyles/StaticStyles/MenuStyleColor.scss"></style>