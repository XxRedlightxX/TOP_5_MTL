<template>
    <div id="newEventComponent">
      <swiper
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
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
        <h2>{{ newEvent[indexSlide].title }}</h2>
        <p>{{ newEvent[indexSlide].desc }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import 'swiper/css';
  import 'swiper/css/effect-cards';
  import { EffectCards } from 'swiper/modules';
  
  const modules = [EffectCards];
  const indexSlide = ref(0);
  const swiperRef = ref(null);
  const autoSlideInterval = ref(5000);
  let slideDirection = 1; // 1 for forward, -1 for backward
  
  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  
  const newEvent = [
    { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text },
    { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text },
    { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text },
    { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text },
    { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text },
    { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text },
  ];
  
  // Fonction pour mettre à jour l'index du slide actif
  const onSlideChange = (swiper) => {
    indexSlide.value = swiper.activeIndex;
  };
  
  // Fonction pour gérer le slide automatique
  const autoSlide = () => {
    const swiper = swiperRef.value.swiper;
    if (!swiper) return;
  
    const totalSlides = swiper.slides.length;
    
    // Si on est à la fin, inverser la direction
    if (swiper.activeIndex === totalSlides - 1) {
      slideDirection = -1;
    } else if (swiper.activeIndex === 0) {
      slideDirection = 1;
    }
  
    // Slider dans la direction actuelle
    if (slideDirection === 1) {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  };
  
  // Démarrer l'intervalle automatique au montage
  onMounted(() => {
    autoSlideInterval.value = setInterval(autoSlide, 5000); // Toutes les 5 secondes
  });
  
  // Nettoyer l'intervalle lorsqu'on quitte le composant
  onBeforeUnmount(() => {
    clearInterval(autoSlideInterval.value);
  });
</script>

<style src="../../../styles/HomesStyles/NewEventComponentStyle/NewEventComponentStyle.scss"></style>