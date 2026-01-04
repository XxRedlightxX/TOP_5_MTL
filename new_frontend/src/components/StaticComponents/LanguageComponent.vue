<template>
  <div id="languageSetter" class="glass drop" @click="LocalStorageManager.changeLanguage()">
    <p> {{ !actualLang ? 'EN' : 'FR' }} </p>
  </div>
</template>

<script setup>
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import Setup from '@/JS/Setup';

  const actualLang = Setup.languageSetup();
</script>

<style src="../../styles/ComponentsStyles/StaticStyles/LanguageStyle.scss"></style>
<style src="../../styles/ComponentsStyles/StaticStyles/LanguageStyleColor.scss"></style>