<template>
    <div class="upComingEvent" ref="wrapper">
      <!-- <i  class="fa-solid fa-angle-left"></i> -->
      <v-icon icon="mdi-arrow-left-bold" id="left" :class="['icon', {'justGlow' : !actualMode}]" @click="scroll('left')"/>
      <ul class="carousel" ref="carousel">
        <li v-for="(event, index) in UpComingEvents" :key="index" class="card">
          <div class="img"><img :src="event.image" alt="img" draggable="false" /></div>
          <h2>{{ event.Title }}</h2>

          <div class="eventDescriptionInfos">
            <div class="d">
                <!-- <img src="../../../assets/location.svg" alt=""> -->
                 {{ event.location }}
            </div>
            <div class="d">
                <!-- <img src="../../../assets/clock.svg" alt=""> -->
                {{ event.time }}
            </div>
          </div>

        </li>
      </ul>
      <v-icon icon="mdi-arrow-right-bold" id="right" :class="['icon', {'justGlow' : !actualMode}]" @click="scroll('right')"/>
      <!-- <i  class="fa-solid fa-angle-right"></i> -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        UpComingEvents: [
          { Title: 'Blanche Pearson', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
          { Title: 'Joenas Brauers', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
          { Title: 'Lariach French', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
          { Title: 'James Khosravi', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
          { Title: 'Kristina Zasiadko', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' },
          { Title: 'Donald Horton', location: 'Montreal, Vieux-Port', time: 'Octobre 11 - 16:00pm', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/1c/26/4f/photo1jpg.jpg?w=1200&h=1200&s=1' }
        ],
        isDragging: false,
        startX: 0,
        startScrollLeft: 0,
        timeoutId: null,
        isAutoPlay: true
      };
    },
    mounted() {
      this.initializeCarousel();
    },
    methods: {
      initializeCarousel() {
        const carousel = this.$refs.carousel;
        const wrapper = this.$refs.wrapper;
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
        const cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  
        // Duplicate items for infinite scroll
        const children = Array.from(carousel.children);
        children.slice(-cardPerView).reverse().forEach(card => {
          carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
        });
        children.slice(0, cardPerView).forEach(card => {
          carousel.insertAdjacentHTML('beforeend', card.outerHTML);
        });
  
        carousel.scrollLeft = carousel.offsetWidth;
  
        carousel.addEventListener('mousedown', this.dragStart);
        carousel.addEventListener('mousemove', this.dragging);
        document.addEventListener('mouseup', this.dragStop);
        carousel.addEventListener('scroll', this.infiniteScroll);
        wrapper.addEventListener('mouseenter', () => clearTimeout(this.timeoutId));
        wrapper.addEventListener('mouseleave', this.autoPlay);
  
        this.autoPlay();
      },
      scroll(direction) {
        const carousel = this.$refs.carousel;
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
        carousel.scrollLeft += direction === 'left' ? -firstCardWidth : firstCardWidth;
      },
      dragStart(e) {
        this.isDragging = true;
        const carousel = this.$refs.carousel;
        carousel.classList.add('dragging');
        this.startX = e.pageX;
        this.startScrollLeft = carousel.scrollLeft;
      },
      dragging(e) {
        if (!this.isDragging) return;
        const carousel = this.$refs.carousel;
        carousel.scrollLeft = this.startScrollLeft - (e.pageX - this.startX);
      },
      dragStop() {
        this.isDragging = false;
        this.$refs.carousel.classList.remove('dragging');
      },
      infiniteScroll() {
        const carousel = this.$refs.carousel;
        const wrapper = this.$refs.wrapper;
  
        if (carousel.scrollLeft === 0) {
          carousel.classList.add('no-transition');
          carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
          carousel.classList.remove('no-transition');
        } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
          carousel.classList.add('no-transition');
          carousel.scrollLeft = carousel.offsetWidth;
          carousel.classList.remove('no-transition');
        }
  
        clearTimeout(this.timeoutId);
        if (!wrapper.matches(':hover')) this.autoPlay();
      },
      autoPlay() {
        const carousel = this.$refs.carousel;
        const firstCardWidth = carousel.querySelector('.card').offsetWidth;
  
        if (window.innerWidth < 800 || !this.isAutoPlay) return;
        this.timeoutId = setTimeout(() => {
          carousel.scrollLeft += firstCardWidth;
        }, 2500);
      }
    },
    beforeDestroy() {
      const carousel = this.$refs.carousel;
      carousel.removeEventListener('mousedown', this.dragStart);
      carousel.removeEventListener('mousemove', this.dragging);
      document.removeEventListener('mouseup', this.dragStop);
      carousel.removeEventListener('scroll', this.infiniteScroll);
    }
  };
  </script>

  

<style src="../../../styles/EventsStyles//ListOfEventsStyles/UpComingEventComponentStyle.scss"></style>