<template>
  <div id="newEventComponent">
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
        v-for="(item, index) in newEvent"
        :key="index"
      >
        <img alt="#" :src="item.image2">
      </swiper-slide>
    </swiper>

    <div class="contentt">
      <div class="top">
        <h2>{{ newEvent[indexSlide].title }}  </h2>
        <router-link class="link" :title="actualLang ? 'Go to the event Page' : 'Allez a la page de l\'evenement'" to="/Event" @click="setEvent(newEvent[indexSlide])">
          <v-icon class="icon glow" icon="mdi-arrow-top-right-thin" />
        </router-link>

      </div>
      <p>{{ newEvent[indexSlide].desc }}</p>
      <Ratings :Rate="false" :rating="newEvent[indexSlide].rating" />
    </div>
  </div>
</template>

<script setup>
  import { Autoplay, EffectCards } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import Setup from '@/JS/Setup';
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase';
  import Ratings from '../StaticComponents/RatingComponent.vue'
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import 'swiper/css/autoplay';

  const modules = [EffectCards, Autoplay];
  const indexSlide = ref(0);
  const swiperRef = ref(null);

  let actualMode = Setup.modeSetup();
  let actualLang = Setup.languageSetup();

  const events = FakeDataBase.getNewEvents();

  let newEvent = ref(null);
  newEvent.value = actualMode.value ? events.eventJour : events.eventNuit;

  // Correction du watcher
  watch(actualMode, (newVal, oldVal) => {
    newEvent.value = newVal ? events.eventJour : events.eventNuit;
  });

  // Fonction pour mettre à jour l'index du slide actif
  const onSlideChange = (swiper) => {
    indexSlide.value = swiper.activeIndex;
  };

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    console.log("event value : ", value);
  };
</script>

<style src="../../styles/ComponentsStyles/HomeStyles/NewEventStyle.scss"></style>
<style src="../../styles/ComponentsStyles/HomeStyles/NewEventStyleColor.scss"></style>