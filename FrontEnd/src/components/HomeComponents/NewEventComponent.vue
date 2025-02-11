<template>
  <div id="newEventComponent">
    <swiper
      :effect="'cards'"
      :grabCursor="true"
      :modules="modules"
      :autoplay="{ delay: 5000, disableOnInteraction: false }"
      ref="swiperRef"
      class="mySwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide
        v-for="(item, index) in newEvent"
        :key="index"
      >
        <img :src="item.image" alt="#">
      </swiper-slide>
    </swiper>

    <div class="contentt">
      <div class="top">
        <h2>{{ newEvent[indexSlide].title }}  </h2>
        <router-link to="/Event" class="link" title="Go to the event Page" @click="setEvent(newEvent[indexSlide])">
          <v-icon icon="mdi-arrow-top-right-thin" class="icon glow"/>
        </router-link>

      </div>
      <p>{{ newEvent[indexSlide].desc }}</p>
      <Ratings :rating="newEvent[indexSlide].rating" :Rate="false"/>
    </div>
  </div>
</template>

<script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref, onMounted, onUnmounted, watch } from 'vue';
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import 'swiper/css/autoplay';
  import { EffectCards, Autoplay } from 'swiper/modules';
  import LocalStorageManager from "@/JS/LocalStaorageManager";
  import Ratings from "../RatingComponent.vue"

  const modules = [EffectCards, Autoplay];
  const indexSlide = ref(0);
  const swiperRef = ref(null);

  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  const actualMode = ref(LocalStorageManager.getMode());

  if (actualMode.value == null){
      LocalStorageManager.setMode(true);
      actualMode.value = LocalStorageManager.getMode();
  }

  const handleModeChange = (event) => {
      actualMode.value = JSON.parse(event.detail.storage);
  };

  // Add event listener for mode changes
  onMounted(() => {
      window.addEventListener('mode-changed', handleModeChange);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
      window.removeEventListener('mode-changed', handleModeChange);
  });

  const newEventJours = [
    { image: "https://picsum.photos/286/425", title: "Mont-Royal", desc: text, rating: 3 },
    { image: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 5 },
    { image: "https://picsum.photos/288/427", title: "Laronde", desc: text, rating: 1 },
    { image: "https://picsum.photos/288/427", title: "Jardin Botanique", desc: text, rating: 2.5 },
    { image: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 3 },
    { image: "https://picsum.photos/288/427", title: "Laronde", desc: text, rating: 4 },
    { image: "https://picsum.photos/286/425", title: "Mont-Royal", desc: text, rating: 3.5 },
    { image: "https://picsum.photos/289/428", title: "Jardin Botanique", desc: text, rating: 1.5 },
    { image: "https://picsum.photos/287/426", title: "Vieux-Port", desc: text, rating: 4.5 }
  ];

  const newEventNuit = [
    {image : "https://picsum.photos/286/424", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/288/427", title: "La Voute", desc: text, rating: 3.5 },
    {image : "https://picsum.photos/289/428", title: "Casino", desc: text, rating: 2 },
    {image : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/288/427", title: "La Voute", desc: text, rating: 3.5 },
    {image : "https://picsum.photos/287/426", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/289/428", title: "Casino", desc: text, rating: 2 },
    {image : "https://picsum.photos/288/425", title: "La Voute", desc: text, rating: 3.5 }
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



<style src="../../styles/HomesStyles/NewEventComponentStyle.scss"></style>