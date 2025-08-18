<template>
  <div id="footerComponent">
    <FooterWaves />
    <div class="links">
      <router-link to="/" :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'">{{actualLang ? 'Home' : 'Accueil'}}</router-link>
      <router-link to="/Events" :title="actualLang ? 'Go to Event Page' : 'Allez a la page d\'aEvenement'">{{actualLang ? 'Events' : 'Evenement'}}</router-link>
      <router-link to="/Profile" :title="actualLang ? 'Go to Profile Page' : 'Allez a la page Profile'">{{actualLang ? 'Profile' : 'Profile'}}</router-link>
    </div>

    <p>&copy Debraise et le touriste</p>
  </div>
</template>

<script setup>
  import FooterWaves from '@/components/StaticComponents/FooterWaveComponent.vue';
  import Setup from '@/JS/Setup';

  let actualLang = Setup.languageSetup();
</script>

<style src="../../styles/ComponentsStyles/StaticStyles/FooterStyle.scss"></style>
<style src="../../styles//ComponentsStyles/StaticStyles/FooterStyleColor.scss"></style>