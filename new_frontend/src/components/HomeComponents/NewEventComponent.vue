<template>
  <div id="newEventComponent">
    <swiper
      ref="swiperRef"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      class="mySwiper"
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in newEvent"
        :key="index"
      >
        <img :src="item.image2" alt="#">
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
  import { EffectCards, Autoplay } from 'swiper/modules';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import 'swiper/css/autoplay';
  import Setup from '@/JS/Setup';
  import Ratings from "../StaticComponents/RatingComponent.vue"

  const modules = [EffectCards, Autoplay];
  const indexSlide = ref(0);
  const swiperRef = ref(null);

  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  
  const actualMode = Setup.modeSetup();
  let actualLang = Setup.languageSetup();

  const newEventJours = [
    { image: "https://picsum.photos/1895/795", image2: "https://picsum.photos/286/425", title: "Mont-Royal", desc: text, rating: 3 },
    { image: "https://picsum.photos/1895/794", image2: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 5 },
    { image: "https://picsum.photos/1894/793", image2: "https://picsum.photos/288/427", title: "Laronde", desc: text, rating: 1 },
    { image: "https://picsum.photos/1895/796", image2: "https://picsum.photos/288/427", title: "Jardin Botanique", desc: text, rating: 2.5 },
    { image: "https://picsum.photos/1893/795", image2: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 3 },
    { image: "https://picsum.photos/1896/795", image2: "https://picsum.photos/288/427", title: "Laronde", desc: text, rating: 4 },
    { image: "https://picsum.photos/1898/793", image2: "https://picsum.photos/286/425", title: "Mont-Royal", desc: text, rating: 3.5 },
    { image: "https://picsum.photos/1893/795", image2: "https://picsum.photos/289/428", title: "Jardin Botanique", desc: text, rating: 1.5 },
    { image: "https://picsum.photos/1895/794", image2: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 4.5 }
  ];

  const newEventNuit = [
    {image: "https://picsum.photos/1895/795", image2 : "https://picsum.photos/286/424", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image: "https://picsum.photos/1894/795", image2 : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image: "https://picsum.photos/1893/795", image2 : "https://picsum.photos/288/427", title: "La Voute", desc: text, rating: 3.5 },
    {image: "https://picsum.photos/1892/795", image2 : "https://picsum.photos/289/428", title: "Casino", desc: text, rating: 2 },
    {image: "https://picsum.photos/1896/795", image2 : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image: "https://picsum.photos/1895/794", image2 : "https://picsum.photos/288/427", title: "La Voute", desc: text, rating: 3.5 },
    {image: "https://picsum.photos/1895/793", image2 : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image: "https://picsum.photos/1895/792", image2 : "https://picsum.photos/289/428", title: "Casino", desc: text, rating: 2 },
    {image: "https://picsum.photos/1895/796", image2 : "https://picsum.photos/288/425", title: "La Voute", desc: text, rating: 3.5 }
  ];

  let newEvent = ref(null);
  newEvent.value = actualMode.value ? newEventJours : newEventNuit;

  // Correction du watcher
  watch(actualMode, (newVal, oldVal) => {
    newEvent.value = newVal ? newEventJours : newEventNuit;
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