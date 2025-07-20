<template>
  <div class="upComingEvent" ref="wrapper">
    <span id="left" @click="scroll('left')"><</span>
    <ul class="carousel" ref="carousel">
      <li v-for="(event, index) in UpComingEvents" :key="index" class="card">
        <div class="img">
          <img :src="event.image" alt="img" draggable="false" />
          <heart :size="0"/>
        </div>
        <h2>{{ event.Title }}</h2>
        <div class="eventDescriptionInfos">
          <div class="d">
            <v-icon icon="mdi-map-marker " :class="['icon', {'justGlow' : !actualMode}]"/>
            {{ event.location }}
          </div>
          <div class="d">
            <v-icon icon="mdi-clock-outline " :class="['icon', {'justGlow' : !actualMode}]"/>
            {{ event.time }}
          </div>
        </div>
      </li>
    </ul>
    <span id="right" @click="scroll('right')">></span>
  </div>
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import Heart from "./heartIcon.vue"

  const UpComingEvents = ref([
    { Title: 'Blanche Pearson', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
    { Title: 'Joenas Brauers', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
    { Title: 'Lariach French', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
    { Title: 'James Khosravi', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
    { Title: 'Kristina Zasiadko', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
    { Title: 'Donald Horton', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' }
  ]);

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

  onMounted(initializeCarousel);

  onBeforeUnmount(() => {
    carousel.value.removeEventListener('mousedown', dragStart);
    carousel.value.removeEventListener('mousemove', dragging);
    document.removeEventListener('mouseup', dragStop);
    carousel.value.removeEventListener('scroll', infiniteScroll);
  });
</script>

<style src="../../../styles/EventsStyles//ListOfEventsStyles/UpComingEventComponentStyle.scss"></style>