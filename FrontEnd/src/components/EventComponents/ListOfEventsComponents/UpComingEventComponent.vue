<template>
  <div class="upComingEvent" ref="wrapper">
    <span id="left" @click="scroll('left')"><</span>
    <ul class="carousel" ref="carousel">
      <router-link to="/Event" v-for="(event, index) in UpComingEvents" :key="index" class="card"  @click="setEvent(event)">
        <div class="img">
          <img :src="event.image" alt="img" draggable="false" />
        </div>
        <h2>{{ event.title }}</h2>
        <div class="eventDescriptionInfos">
          <div class="d">
            <v-icon icon="mdi-map-marker " :class="['icon', {'justGlow' : !actualMode}]"/>
            montreal, {{ event.title }}
          </div>
          <div class="d">
            <v-icon icon="mdi-clock-outline " :class="['icon', {'justGlow' : !actualMode}]"/>
            12 h
          </div>
        </div>
      </router-link>
    </ul>
    <span id="right" @click="scroll('right')">></span>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import storageManager from "../../../JS/LocalStaorageManager";

  //const UpComingEvents = ref([
  const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
  const UpComingEvents = [
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

  const UpComingEventsNuit = [
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

  const wrapper = ref(null);
  const carousel = ref(null);
  const isDragging = ref(false);
  const startX = ref(0);
  const startScrollLeft = ref(0);
  const timeoutId = ref(null);
  const isAutoPlay = ref(true);

  const initializeCarousel = () => {
    const firstCardWidth = carousel.value.querySelector('.card').offsetWidth;
    const cardPerView = Math.round(carousel.value.offsetWidth / firstCardWidth);
    
    const children = Array.from(carousel.value.children);
    children.slice(-cardPerView).reverse().forEach(card => {
      carousel.value.insertAdjacentHTML('afterbegin', card.outerHTML);
    });
    children.slice(0, cardPerView).forEach(card => {
      carousel.value.insertAdjacentHTML('beforeend', card.outerHTML);
    });
    
    carousel.value.scrollLeft = carousel.value.offsetWidth;
    
    carousel.value.addEventListener('mousedown', dragStart);
    carousel.value.addEventListener('mousemove', dragging);
    document.addEventListener('mouseup', dragStop);
    carousel.value.addEventListener('scroll', infiniteScroll);
    wrapper.value.addEventListener('mouseenter', () => clearTimeout(timeoutId.value));
    wrapper.value.addEventListener('mouseleave', autoPlay);

    autoPlay();
  };

  const scroll = (direction) => {
    const firstCardWidth = carousel.value.querySelector('.card').offsetWidth;
    carousel.value.scrollLeft += direction === 'left' ? -firstCardWidth : firstCardWidth;
  };

  const dragStart = (e) => {
    isDragging.value = true;
    carousel.value.classList.add('dragging');
    startX.value = e.pageX;
    startScrollLeft.value = carousel.value.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging.value) return;
    carousel.value.scrollLeft = startScrollLeft.value - (e.pageX - startX.value);
  };

  const dragStop = () => {
    isDragging.value = false;
    carousel.value.classList.remove('dragging');
  };

  const infiniteScroll = () => {
    if (carousel.value.scrollLeft === 0) {
      carousel.value.classList.add('no-transition');
      carousel.value.scrollLeft = carousel.value.scrollWidth - 2 * carousel.value.offsetWidth;
      carousel.value.classList.remove('no-transition');
    } else if (Math.ceil(carousel.value.scrollLeft) === carousel.value.scrollWidth - carousel.value.offsetWidth) {
      carousel.value.classList.add('no-transition');
      carousel.value.scrollLeft = carousel.value.offsetWidth;
      carousel.value.classList.remove('no-transition');
    }
    clearTimeout(timeoutId.value);
    if (!wrapper.value.matches(':hover')) autoPlay();
  };

  const autoPlay = () => {
    const firstCardWidth = carousel.value.querySelector('.card').offsetWidth;
    if (window.innerWidth < 800 || !isAutoPlay.value) return;
    timeoutId.value = setTimeout(() => {
      carousel.value.scrollLeft += firstCardWidth;
    }, 2500);
  };
  const setEvent = (value) => {
    storageManager.setEvent(value);
    console.log("Event value: ", value);
  }

  onMounted(initializeCarousel);

  onBeforeUnmount(() => {
    carousel.value.removeEventListener('mousedown', dragStart);
    carousel.value.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragStop);
    carousel.value.removeEventListener('scroll', infiniteScroll);
  });
</script>

<style src="../../../styles/EventsStyles//ListOfEventsStyles/UpComingEventComponentStyle.scss"></style>