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
      <Ratings :rating="newEvent[indexSlide].rating"/>
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
    { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 3 },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 5 },
    { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 1 },
    { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 2.5 },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
    { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 4 },
    { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 3.5 },
    { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 1.5 },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 4.5 }
  ];

  const newEventNuit = [
    {image : "/src/assets/HomeCarousel/Bateau-mouche-nuit.jpg", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image : "/src/assets/HomeCarousel/Pont-Jaque-Cartier-Nuit.jpg", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "/src/assets/HomeCarousel/La-voute-nuit.jpg", title: "La Voute", desc: text, rating: 3.5 },
    {image : "/src/assets/HomeCarousel/Casino-nuit.jpg", title: "Casino", desc: text, rating: 2 },
    {image : "/src/assets/HomeCarousel/Pont-Jaque-Cartier-Nuit.jpg", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "/src/assets/HomeCarousel/La-voute-nuit.jpg", title: "La Voute", desc: text, rating: 3.5 },
    {image : "/src/assets/HomeCarousel/Pont-Jaque-Cartier-Nuit.jpg", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "/src/assets/HomeCarousel/Casino-nuit.jpg", title: "Casino", desc: text, rating: 2 },
    {image : "/src/assets/HomeCarousel/La-voute-nuit.jpg", title: "La Voute", desc: text, rating: 3.5 }
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



<style src="../../styles/HomesStyles/NewEventComponentStyle/NewEventComponentStyle.scss"></style>