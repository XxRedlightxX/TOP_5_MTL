<template>
  <div id="carouselGrand">
    <!-- list item -->
    <div class="list">
      <div v-for="(item, index) in carouselItems" :key="index" class="item">
        <div class="imgContainer">
          <div class="overlayGrad"></div>
          <img :src="item.image">
        </div>
        <div class="content">
          <div :class="index == 0 ? 'titlee' : 'lostTitle'">{{ item.title }}</div>

          <div :class="index == 0 ? 'buttons' : 'lostBouttons'">
            <router-link class="btn roundBorderSmall" to="/Event" @click="setEvent(item)">{{ textEvent }}</router-link>
            <router-link class="btn roundBorderSmall" to="/Event Organisator" @click="setEvent(item)">Découvrir les Organisateurs</router-link>
          </div>
          <div :class="index == 0 ? 'desc' : 'lostdesc'">
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- list thumbnail -->
    <div class="thumbnail">
      <div v-for="(item, index) in carouselItems" :key="index" class="item">
        <img class=" roundBorderSmall" :src="item.image2">
        <div class="content">
          <div class="title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <!-- next prev -->
    <div class="arrows">
      <button @click="showSlider('prev')"><</button>
      <button @click="showSlider('next')">></button>
    </div>
    <!-- time running -->
    <div class="time"></div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onBeforeUnmount } from "vue";
  import { useRouter } from "vue-router";
  import LocalStorageManager from "../../../JS/LocalStorageManager";
  import Setup from "../../../JS/Setup";
  import FakeDataBase from "../../../JS/ToBeDeleted/FakeDataBase";

  // Constantes de texte
  const text1a = "See the event";
  const text1b = "Voir l'evenement";
  const text2a = "Organisator";
  const text2b = "Découvrir les Organisateurs";

  // Récupération des données fake DB
  const events = FakeDataBase.getCarousellEvent();

  // router
  const router = useRouter();

  // Mode & Lang depuis Setup
  const actualMode = ref(Setup.modeSetup().value);
  const actualLang = ref(Setup.languageSetup().value);

  // État réactif du carrousel
  const carouselItems = ref(actualMode.value ? events.eventJour : events.eventNuit);
  const textEvent = ref(actualLang.value ? text1a : text1b);
  const textOrganisator = ref(actualLang.value ? text2a : text2b);

  const timeRunning = 3000;
  const timeAutoNext = 5000;
  let runTimeOut = null;
  let runNextAuto = null;

  // Méthodes
  function setEvent(value) {
    LocalStorageManager.setEvent(value);
    console.log("Event value: ", value);
  }

  function handleClick(event, item) {
    event.preventDefault();
    setEvent(item);
    router.push({ name: "Event" });
  }

  function showSlider(direction) {
    if (direction === "next") {
      carouselItems.value.push(carouselItems.value.shift());
    } else {
      carouselItems.value.unshift(carouselItems.value.pop());
    }
    resetSlider();
  }

  function resetSlider() {
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      document.getElementById("carouselGrand")?.classList.remove("next", "prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    setNextAuto();
  }

  function setNextAuto() {
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  }

  function handleModeChange(event) {
    actualMode.value = JSON.parse(event.detail.storage);
  }

  function handleLangChange(event) {
    actualLang.value = JSON.parse(event.detail.storage);
  }

  // Lifecycle
  onMounted(() => {
    window.addEventListener("mode-changed", handleModeChange);
    window.addEventListener("lang-changed", handleLangChange);
    setNextAuto();
  });

  onBeforeUnmount(() => {
    window.removeEventListener("mode-changed", handleModeChange);
    window.removeEventListener("lang-changed", handleLangChange);
  });

  // Watchers
  watch(actualMode, (newVal) => {
    console.log("Mode changed: ", newVal);
    carouselItems.value = newVal ? events.eventJour : events.eventNuit;
  });

  watch(actualLang, (newVal) => {
    textEvent.value = newVal ? text1a : text1b;
    textOrganisator.value = newVal ? text2a : text2b;
  });
</script>
<!-- <script src='../../../JS/ToBeDeleted/CarousellScript.js'></script> -->

<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyleColor.scss"></style>