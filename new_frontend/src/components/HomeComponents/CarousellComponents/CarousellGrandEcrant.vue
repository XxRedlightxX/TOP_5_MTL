<template>
  <div v-if="sliderEvents.length > 0" id="carouselGrand">
    <!-- list item -->
    <div class="list">
      <div v-for="(item, index) in sliderEvents" :key="index" class="item">
        <div class="imgContainer">
          <div class="overlayGrad"></div>
          <img :src="item.image">
        </div>
        <div class="content">
          <div :class="[index == 0 ? 'titlee' : 'lostTitle', item.id == -1 ? 'fakeTitle' : '']"> {{ item.title }} </div>

          <div :class="index == 0 ? 'buttons' : 'lostBouttons'">
            <button class="btn roundBorderSmall" @click="props.fake && goToEvent(item.id)"> {{actualLang ? "See the event" : "Voir l'evenement" }}</button>

            <button class="btn roundBorderSmall" @click="props.fake && goToOrganisator(item.id)"> {{ actualLang ? "Organisator" : "Découvrir les Organisateurs"  }}</button>
          </div>
          <div :class="index == 0 ? 'desc' : 'lostdesc'">
            <p :class="item.id == -1 ? 'fakeDesc' : ''">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- list thumbnail -->
    <div class="thumbnail">
      <div v-for="(item, index) in sliderEvents" :key="index" class="item">
        <img class=" roundBorderSmall" :src="item.image2">
        <div class="content">
          <div :class="['title', item.id == -1 ? 'fakeTitle' : '']">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <!-- next prev -->
    <div class="arrows">
      <button @click="props.fake && showSlider('prev')"><</button>
      <button @click="props.fake && showSlider('next')">></button>
    </div>
    <!-- time running -->
    <div class="time"></div>
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, defineProps } from "vue";
  import { useRouter } from "vue-router";
  import Setup from "../../../JS/Setup";
  import SetupEvents from "@/JS/SetupEvents";

  // router
  const router = useRouter();
  const actualLang = Setup.languageSetup();

  const timeRunning = 3000;
  const timeAutoNext = 5000;
  let runTimeOut = null;
  let runNextAuto = null;
  const sliderEvents = ref([]);

  const props = defineProps({
    events: {
      type: Array,
      default: () => []
    },
    fake: {
      type: Boolean,
      default: true
    }
  });

  // Méthodes
  async function goToEvent(id) {
    await setEvent(id);   // 1) stocker l’event
    router.push("/Event"); // 2) naviguer ensuite
  }

  async function setEvent(id) {
    const event = await SetupEvents.singleEventSetup(id)
  }

  async function goToOrganisator(id) {
    await setOrganisator(id);   // 1) stocker l’event
    router.push("/Event Organisator"); // 2) naviguer ensuite
  }

  async function setOrganisator(id) {
    const event = await SetupEvents.organisatortSetup(id)
  }

  function handleClick(event, item) {
    event.preventDefault();
    setEvent(item);
    router.push({ name: "Event" });
  }

  function showSlider(direction) {
    if (direction === "next") {
      sliderEvents.value.push(sliderEvents.value.shift());
    } else {
      sliderEvents.value.unshift(sliderEvents.value.pop());
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

  watch(
    () => props.events,
    (newEvents) => {
      sliderEvents.value = [...newEvents];
    },
    { immediate: true }
  );

  onMounted(() => {
    if (props.fake) {
      setNextAuto();
    }
  });
</script>

<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/HomeStyles/CarousellGrandStyleColor.scss"></style>