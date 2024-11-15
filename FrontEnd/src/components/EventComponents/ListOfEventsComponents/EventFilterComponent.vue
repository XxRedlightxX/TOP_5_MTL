<template>
    <div class="eventFilter" ref="wrapper">
      <span id="left" @click="scroll('left')" :class="[{'glow' : !actualMode}]"><</span>
      <ul class="carousel" ref="carousel">
        <li v-for="(event, index) in eventFilters" :key="index" class="card">
          <v-icon :icon="event.icon" :class="['icon', {'glow' : !actualMode}]"/>
          <h4>{{ event.Title }}</h4>
        </li>
      </ul>
      <span id="right" @click="scroll('right')" :class="[{'glow' : !actualMode}]">></span>
    </div>
  </template>
  
  <script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
  
    const eventFilters = ref([
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-menu"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-menu"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-menu"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"},
      { Title: 'Nature', icon: "mdi-nature"}
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

<style src="../../../styles/EventsStyles/EventFilterComponentStyle.scss"></style>