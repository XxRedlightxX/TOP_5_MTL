<template>
  <div v-if="carouselItems.length > 0" id="carouselGrand">
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
            <router-link class="btn roundBorderSmall" to="/Event Organisator" @click="setOrganisator()">Découvrir les Organisateurs</router-link>
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
  import { ref, watch, onMounted, defineProps } from "vue";
  import { useRouter } from "vue-router";
  import LocalStorageManager from "../../../JS/LocalStorageManager";
  import Setup from "../../../JS/Setup";
  import FakeDataBase from "../../../JS/ToBeDeleted/FakeDataBase";

  // Constantes de texte
  const text1a = "See the event";
  const text1b = "Voir l'evenement";
  const text2a = "Organisator";
  const text2b = "Découvrir les Organisateurs";

  // router
  const router = useRouter();

  // Mode & Lang depuis Setup
  const actualMode = ref(Setup.modeSetup().value);
  const actualLang = ref(Setup.languageSetup().value);

  const props = defineProps({
    events: {
      type: Array,
      default: () => []
    }
  });


  // État réactif du carrousel
  const carouselItems = ref([]);
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

  function setOrganisator() {
    let user = FakeDataBase.getUser();
    LocalStorageManager.setOrganisator(user);
  }

  function handleClick(event, item) {
    event.preventDefault();
    setEvent(item);
    router.push({ name: "Event" });
  }

  //Lifecycle
  onMounted(() => {
    carouselItems.value = props.events;
    setNextAuto();
  });

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

  // to be deleted
  watch(actualLang, (newVal) => {
    textEvent.value = newVal ? text1a : text1b;
    textOrganisator.value = newVal ? text2a : text2b;
  });
  ///
</script>
<!-- <script src='../../../JS/ToBeDeleted/CarousellScript.js'></script> -->

<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyleColor.scss"></style>