<template>
    <div @click="changeLang()" id="languageSetter"  class="glass drop">
        <p v-if="actualLang != true">EN</p>
        <p v-else>FR</p>
    </div>


</template>

<script setup>
  import storageManager from "@/JS/LocalStaorageManager"
  import { ref } from "vue";

  let actualLang = ref(storageManager.getLang());

  if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
  }

  const changeLang = () => {
      console.log("new lang val = " + !actualLang.value)
      storageManager.setLang(!actualLang.value);
      actualLang.value = !actualLang.value
  }

</script>

<style src="../styles/LanguageComponentStyle.scss"></style>