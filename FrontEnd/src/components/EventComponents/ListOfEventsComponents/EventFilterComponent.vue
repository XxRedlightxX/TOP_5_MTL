<template>
  <div class="eventFilter" ref="wrapper">
    <span id="left" @click="scroll('left')" :class="[{'glow' : !actualMode}]"><</span>
    
    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      Loading categories...
    </div>
    
    <!-- Empty state -->
    <div v-else-if="eventFilters.length === 0" class="no-categories">
      No categories available
    </div>
    
    <!-- Carousel -->
    <ul v-else class="carousel" ref="carousel">
      <li
        v-for="(event, index) in eventFilters"
        :key="event.id || index"
        class="card"
        :data-id="event.id"
        :class="{ active: selectedFilterValue && selectedFilterValue.id === event.id }"
      >
        <v-icon :icon="event.icon" :class="['icon', {'glow' : !actualMode}]"/>
        <h4>{{ event.Title }}</h4>
      </li>
    </ul>
    
    <span id="right" @click="scroll('right')" :class="[{'glow' : !actualMode}]">></span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from 'vue';
import { useActivityStore } from '@/stores/activity';

const activitiesStore = useActivityStore();
const eventFilters = ref([]);
const selectedFilterValue = ref(null);
const isLoading = ref(true);
const carouselInitialized = ref(false);

const wrapper = ref(null);
const carousel = ref(null);
const isDragging = ref(false);
const startX = ref(0);
const startScrollLeft = ref(0);
const timeoutId = ref(null);
const isAutoPlay = ref(true);

// 🧩 Load categories
onMounted(async () => {
  try {
    await activitiesStore.getCategories();

    if (activitiesStore.categories?.length > 0) {
      eventFilters.value = activitiesStore.categories.map(category => ({
        id: category.id,
        Title: category.nom,
        icon: category.image_data,
      }));
    }
  } catch (error) {
    console.error('Failed to load categories:', error);
  } finally {
    isLoading.value = false;
  }
});

// 🧩 Initialize carousel once data is ready
watch(eventFilters, (newFilters) => {
  if (newFilters.length > 0 && !carouselInitialized.value && !isLoading.value) {
    nextTick(() => {
      setTimeout(() => {
        initializeCarousel();
        carouselInitialized.value = true;
      }, 300);
    });
  }
});

// 🧩 Filter selection logic
const selectFilter = (filter) => {
  selectedFilterValue.value = filter;
};

watch(selectedFilterValue, async (newValue) => {
  if (newValue) {
    if (!activitiesStore.filters) activitiesStore.filters = {};
    activitiesStore.filters.type = newValue.Title;
    await activitiesStore.getActivities();
  }
});

// 🧩 Carousel setup
const initializeCarousel = () => {
  if (!carousel.value) return;

  const firstCard = carousel.value.querySelector('.card');
  if (!firstCard) return;

  const firstCardWidth = firstCard.offsetWidth;
  if (!firstCardWidth) return;

  const carouselWidth = carousel.value.offsetWidth;
  const cardPerView = Math.round(carouselWidth / firstCardWidth);
  const children = Array.from(carousel.value.children);

  // Clone edges for infinite scroll
  if (children.length >= cardPerView) {
    children.slice(-cardPerView).reverse().forEach(card => {
      carousel.value.insertAdjacentHTML('afterbegin', card.outerHTML);
    });
    children.slice(0, cardPerView).forEach(card => {
      carousel.value.insertAdjacentHTML('beforeend', card.outerHTML);
    });
  }

  carousel.value.scrollLeft = carousel.value.offsetWidth;

  // Event listeners
  carousel.value.addEventListener('mousedown', dragStart);
  carousel.value.addEventListener('mousemove', dragging);
  document.addEventListener('mouseup', dragStop);
  carousel.value.addEventListener('scroll', infiniteScroll);
  carousel.value.addEventListener('click', handleCarouselClick);

  if (wrapper.value) {
    wrapper.value.addEventListener('mouseenter', () => clearTimeout(timeoutId.value));
    wrapper.value.addEventListener('mouseleave', () => autoPlay(true));
  }

  // ✅ Start autoplay after layout stabilizes
  nextTick(() => {
    setTimeout(() => {
      if (carousel.value && eventFilters.value.length > 0) {
        autoPlay(true);
      }
    }, 1000);
  });
};

// 🧩 Handle card click
const handleCarouselClick = (e) => {
  const card = e.target.closest('.card');
  if (!card) return;
  const id = parseInt(card.dataset.id);
  const event = eventFilters.value.find(e => e.id === id);
  if (event) selectFilter(event);
};

// 🧩 Scroll controls
const scroll = (direction) => {
  const firstCard = carousel.value?.querySelector('.card');
  if (!firstCard) return;
  const firstCardWidth = firstCard.offsetWidth;
  carousel.value.scrollLeft += direction === 'left' ? -firstCardWidth : firstCardWidth;
};

// 🧩 Drag handling
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

// 🧩 Infinite scroll
const infiniteScroll = () => {
  if (!carousel.value) return;

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
  if (!wrapper.value?.matches(':hover')) autoPlay(false);
};

// 🧩 Autoplay (fixed)
const autoPlay = (reset = false) => {
  if (reset) clearTimeout(timeoutId.value);

  const firstCard = carousel.value?.querySelector('.card');
  if (!firstCard) return;

  const firstCardWidth = firstCard.offsetWidth;
  if (window.innerWidth < 800 || !isAutoPlay.value) return;

  timeoutId.value = setTimeout(() => {
    if (!wrapper.value?.matches(':hover')) {
      carousel.value.scrollLeft += firstCardWidth + 5;
    }
    autoPlay(); // ✅ always restart
  }, 2500);
};

// 🧩 Cleanup
onBeforeUnmount(() => {
  if (!carousel.value) return;
  carousel.value.removeEventListener('mousedown', dragStart);
  carousel.value.removeEventListener('mousemove', dragging);
  document.removeEventListener('mouseup', dragStop);
  carousel.value.removeEventListener('scroll', infiniteScroll);
  carousel.value.removeEventListener('click', handleCarouselClick);
});
</script>



<style src="../../../styles/EventsStyles/EventFilterComponentStyle.scss"></style>
