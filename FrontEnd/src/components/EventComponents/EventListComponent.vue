<template>

    <div id="eventListComponent">
      <!--<section class="product"> 
      <h2 class="product-category">Up Coming</h2>
        <button class="pre-btn"><img src="../../assets/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../../assets/arrow.png" alt=""></button>
        <div class="product-container">
            <div class="product-card"  v-for="(item, index) in newEvent" :key="index">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img :src="item.image" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
            <div class="product-card">
                <div class="product-image">
                    <span class="discount-tag">50% off</span>
                    <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">
                    <button class="card-btn">add to wishlist</button>
                </div>
                <div class="product-info">
                    <h2 class="product-brand">brand</h2>
                    <p class="product-short-description">a short line about the cloth..</p>
                    <span class="price">$20</span><span class="actual-price">$40</span>
                </div>
            </div>
        </div>
      </section>
        

    -->
      <div class="event">
        <button class="pre-btn"><img src="../../assets/arrow.png" alt=""></button>
        <button class="nxt-btn"><img src="../../assets/arrow.png" alt=""></button>
        <div class="event_card">
            <div class="event_card_photo">
                <span class="overlay"> <img src="../../assets/heart.svg" alt=""></span>
                <img src="../../assets/HomeCarousel/Jardin-botanique.jpg" class="product-thumb" alt="">

            </div>
            <div class="event_description">
                <h3>Acoustic Serenade Showcase</h3>
                <div class="event_description_infos">
                    <img src="../../assets/location.svg" alt="">
                    Montreal, Vieux-Port
                    <img src="../../assets/clock.svg" alt="">
                    Octobre 11 - 16:00pm
                </div>

            </div>
        </div>
      </div>

</div>

</template>

<script setup >

import { onMounted, ref, watch, onUnmounted } from 'vue'; // Add ref here
 import LocalStorageManager from "@/JS/LocalStaorageManager";

onMounted(() => {
    const productContainers = [...document.querySelectorAll('.product-container')];
    const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
    const preBtn = [...document.querySelectorAll('.pre-btn')];

    productContainers.forEach((item, i) => {
        let containerDimensions = item.getBoundingClientRect();
        let containerWidth = containerDimensions.width;

        nxtBtn[i].addEventListener('click', () => {
            item.scrollLeft += containerWidth;
        });

        preBtn[i].addEventListener('click', () => {
            item.scrollLeft -= containerWidth;
        });
    });
});

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




    

<style src="../../styles/EventsStyles/EventListComponentStyle.scss"></style>