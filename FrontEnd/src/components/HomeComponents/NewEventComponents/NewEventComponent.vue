<template>
    <div id="newEventComponent">
      <swiper
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
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
        <!-- Exemple d'utilisation de indexSlide pour afficher des informations -->
        <h2>{{ newEvent[indexSlide].title }}</h2>
        <p>{{ newEvent[indexSlide].desc }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { ref } from 'vue';
    import 'swiper/css';
    import 'swiper/css/effect-cards';
    import { EffectCards } from 'swiper/modules';
  
    const modules = [EffectCards];
    const indexSlide = ref(0);
  
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
  </script>
  
  


<style src="../../../styles/HomesStyles/NewEventComponentStyle/NewEventComponentStyle.scss"></style>