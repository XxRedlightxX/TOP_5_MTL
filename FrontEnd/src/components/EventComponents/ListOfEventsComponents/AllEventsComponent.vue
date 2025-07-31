<template>
   <div id="AllEventComponent">
    <FilterComponent/>
    <div class="events">
      <router-link to="/Event" class="events_card glass" v-for="(item, index) in newEvent" :key="index" @click="setEvent(item)">
        <div class="event_card_photo">
            <!-- Main image -->
            <img :src="item.image" class="product-thumb" alt="Event Image">
        </div>

        <div class="desc">
            <strong>{{ item.title }}</strong>
            <div class="d1">
                <v-icon icon="mdi-map-marker " :class="['icon', {'justGlow' : !actualMode}]"/>
                Montreal, Vieux-Port
            </div>
            <div class="d2">
                <v-icon icon="mdi-clock-outline " :class="['icon', {'justGlow' : !actualMode}]"/>
                Octobre 11 - 16:00pm
            </div>
        </div>
      </router-link>
    </div>
    <PaginationComponent/>
  </div>
</template>

<script setup >

import { onMounted, ref, watch, onUnmounted } from 'vue'; 
import LocalStorageManager from "@/JS/LocalStaorageManager"
import PaginationComponent from './PaginationComponent.vue';
import FilterComponent from './FilterComponent.vue';



  const actualMode = ref(LocalStorageManager.getMode());


  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  const newEventJours = [
    { image: "https://picsum.photos/1895/795", title: "Mont-Royal", desc: text, rating: 3 },
    { image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 5 },
    { image: "https://picsum.photos/1894/793", title: "Laronde", desc: text, rating: 1 },
    { image: "https://picsum.photos/1895/796", title: "Jardin Botanique", desc: text, rating: 2.5 },
    { image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 3 },
    { image: "https://picsum.photos/1894/793", title: "Laronde", desc: text, rating: 4 },
    { image: "https://picsum.photos/1895/795", title: "Mont-Royal", desc: text, rating: 3.5 },
    { image: "https://picsum.photos/1895/796", title: "Jardin Botanique", desc: text, rating: 1.5 },
    { image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 4.5 }
  ];

  const newEventNuit = [
    {image : "https://picsum.photos/1895/795", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 },
    {image : "https://picsum.photos/1892/795", title: "Casino", desc: text, rating: 2 },
    {image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 },
    {image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "https://picsum.photos/1892/795", title: "Casino", desc: text, rating: 2 },
    {image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 }
  ];


  let newEvent = ref(null);
  newEvent.value = actualMode.value ? newEventJours : newEventNuit;

  // Fonction pour mettre à jour l'index du slide actif
  // const onSlideChange = (swiper) => {
  //   indexSlide.value = swiper.activeIndex;
  // };

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    console.log("event value : ", value);
  };

  if (actualMode.value == null){
       LocalStorageManager.setMode(true);
       actualMode.value = LocalStorageManager.getMode();
   }
   // Correction du watcher
   watch(actualMode, (newVal, oldVal) => {
     newEvent.value = newVal ? newEventJours : newEventNuit;
   });
   
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

</script>

<style src="../../../styles/EventsStyles/EventAllComponentStyle.scss"></style>