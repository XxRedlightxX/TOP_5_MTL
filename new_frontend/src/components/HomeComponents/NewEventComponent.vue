<template>
  <div v-if="newEvents.length > 0" id="newEventComponent">
    <swiper
      ref="swiperRef"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="mySwiper"
      :effect="'cards'"
      :grab-cursor="true"
      :modules="modules"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in newEvents"
        :key="index"
      >
        <img alt="#" :src="item.image2">
      </swiper-slide>
    </swiper>

    <div class="contentt">
      <div class="top">
        <h2>{{ newEvents[indexSlide].title }}  </h2>
        <button class="link" :title="actualLang ? 'Go to the event Page' : 'Allez a la page de l\'evenement'" @click="goToEvent(newEvents[indexSlide].id)">
          <v-icon class="icon glow" icon="mdi-arrow-top-right-thin" />
        </button>

      </div>
      <p>{{ newEvents[indexSlide].desc }}</p>
      <Ratings :Rate="false" :rating="newEvents[indexSlide].rating" />
    </div>
  </div>

  <div v-else id="newEventComponent">
    <swiper
      ref="swiperRef"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="mySwiper"
      :effect="'cards'"
      :grab-cursor="true"
      :modules="modules"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in fakeData"
        :key="index"
        class="fakeImg"
      >
        <img alt="#" :src="item.image2">
      </swiper-slide>
    </swiper>

    <div class="contentt">
      <div class="top">
        <h2 class="fakeTitle">{{ fakeData[indexSlide].title }}  </h2>
        <div class="link" :title="actualLang ? 'Go to the event Page' : 'Allez a la page de l\'evenement'"  to="/Event" >
          <v-icon class="icon glow" icon="mdi-arrow-top-right-thin" />
        </div>

      </div>
      <p class="fakeText">{{ fakeData[indexSlide].desc }}</p>
      <Ratings :Rate="false" :rating="fakeData[indexSlide].rating" />
    </div>
    <LoadingComponent :size="130" />
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from "vue-router";

  import Ratings from '../StaticComponents/RatingComponent.vue'
  
  import { Autoplay, EffectCards } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import 'swiper/css/autoplay';

  import Setup from '@/JS/Setup';
  import SetupEvents from '@/JS/SetupEvents'
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import AsyncData from '@/JS/AsyncData';
  import LoadingComponent from '../StaticComponents/LoadingComponent.vue';

  const modules = [EffectCards, Autoplay];
  const indexSlide = ref(0);
  const swiperRef = ref(null);

  let actualMode = Setup.modeSetup();
  let actualLang = Setup.languageSetup();
  let newEvents = ref([]);
  let fakeData = AsyncData.getEvents(6)
  const router = useRouter();

  onMounted(async () => {
    newEvents.value = await SetupEvents.newEventsSetup();
    //console.log('eventsss :', newEvents.value);
  });

  // Fonction pour mettre à jour l'index du slide actif
  const onSlideChange = (swiper) => {
    console.log('swiper index: ' , swiper.activeIndex);
    indexSlide.value = swiper.activeIndex;
  };

  // Méthodes
  async function goToEvent(id) {
    await setEvent(id);   // 1) stocker l’event
    router.push("/Event"); // 2) naviguer ensuite
  }

  async function setEvent(id) {
    const event = await SetupEvents.singleEventSetup(id)
  }
</script>

<style src="../../styles/ComponentsStyles/HomeStyles/NewEventStyle.scss"></style>
<style src="../../styles/ComponentsStyles/HomeStyles/NewEventStyleColor.scss"></style>