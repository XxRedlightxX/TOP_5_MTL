<template>
  
   <div id="AllEventComponent">
    <div class="button-container">
        <ul >
          <li><a>All</a></li>
          <li><a @click="changeMode()" >Night Life</a></li>
          <li><a>Day life</a></li>
          
         
          <li class="button-wrapper">
      <button @click="toggleCalendarPopup" class="beautiful-button">
        <img src="../../../assets/filter.png" alt=""> Filter
      </button>
    </li>
        </ul>
        
      <div>
          
      </div>
    </div>
    <div class="events">
    <div class="events_card" v-for="(item, index) in newEvent" :key="index">
        <div class="event_card_photo">
            <!-- Overlay heart icon -->
            <span class="overlay">
                <img src="../../../assets/heart.svg" alt="Heart Icon" class="heart-icon">
            </span>
            <!-- Main image -->
            <img :src="item.image" class="product-thumb" alt="Event Image">
        </div>
        <div class="desc">
            <strong>{{ item.title }}</strong>
            <div class="d1">
                <img src="../../../assets/location.svg" alt="Location Icon">
                Montreal, Vieux-Port
            </div>
            <div class="d2">
                <img src="../../../assets/clock.svg" alt="Clock Icon">
                Octobre 11 - 16:00pm
            </div>
        </div>
    </div>
</div>

      <div v-if="showCalendarPopup" class="popup-overlay" @click="closePopup">
        <div class="popup-content" @click.stop>
          <h3>Select a Date</h3>

            <!-- Calendar placeholder -->
            <div class="calendar">
             
            </div>
            <h3>Search by Season</h3>
            <!-- Season Tags -->
            <div class="season-tags">
              <span class="tag spring">Spring</span>
              <span class="tag summer">Summer</span>
              <span class="tag fall">Fall</span>
              <span class="tag winter">Winter</span>
            </div>

            <!-- Close Button -->
          <button @click="closePopup">Close</button>
        </div>
    </div>

    <div class="container">
  <ul class="pagination">
    <li>
      <a href="#">Prev</a>
    </li>
    <li>
      <a href="#">1</a>
    </li>
    <li class="active">
      <a href="#">2</a>
    </li>
    <li>
      <a href="#">3</a>
    </li>
    <li>
      <a href="#">4</a>
    </li>
    <li>
      <a href="#">5</a>
    </li>
    <li>
      <a href="#">Next</a>
    </li>
  </ul>
</div>


   </div>
    
</template>

<script setup >

import { onMounted, ref, watch, onUnmounted } from 'vue'; 
import LocalStorageManager from "@/JS/LocalStaorageManager"











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

<style src="../../../styles/EventsStyles/EventAllComponentStyle.scss">
  </style>