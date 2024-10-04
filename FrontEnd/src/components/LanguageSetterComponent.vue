<template>
    <div @click="changeLang()" id="languageSetter"  class="glass">
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

<style lang="scss">
    #languageSetter {
        display: block;
        width: 60px;
        height: 60px;
        text-align: center;
        border-radius: 50%;
        position: fixed;
        bottom: 9%;
        right: 2%;
        z-index: 1000;
        cursor: pointer;
        box-shadow: 0 15px 30px rgba(0, 0, 0, .2),
            0 10px 10px rgba(0, 0, 0, .2);

        p {
            width: 100%;
            height: 100%;
            align-content: center;
            color: black;
            font-size: 2rem;
            border-radius: 50%;
            align-self: center;
        }
    }
</style>