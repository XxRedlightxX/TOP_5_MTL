<template>
  <div id="AllEventComponent">
    <FilterComponent/>
    
    <div class="events">
      <router-link 
        v-if="paginatedEvents.length" 
        :to="{ name: 'show', params: { id: item.id } }" 
        class="events_card glass" 
        v-for="(item, index) in paginatedEvents" 
        :key="item.id"
      >
        <div class="event_card_photo">
           <span class="overlay" > 
            <v-icon
        :color="isLiked(item.id) ? 'red' : 'grey'"
        :icon="isLiked(item.id) ? 'mdi-heart' : 'mdi-heart-outline'"
        size="40"
        @click.stop.prevent="toggleLike(item.id)"
        class="clickable-heart"
      />
          </span>
          <!-- Main image -->
          <img :src="getEventUrl(item.image)" class="product-thumb" alt="Event Image">
        </div>
        
        <div class="desc">
          <strong>{{ item.title }}</strong>
          <div class="d1">
            <v-icon icon="mdi-map-marker" :class="['icon', {'justGlow': !actualMode}]"/>
            {{ item.lieu }}
          </div>
          <div class="d2">
            <v-icon icon="mdi-clock-outline" :class="['icon', {'justGlow': !actualMode}]"/>
            {{ formatDateSpecial(item.date) }}
          </div>
        </div>
      </router-link>
      
      <div v-else class="no-events">
        <p>No events available at the moment.</p>
      </div>
    </div>

   <PaginationComponent 
      :current-page="currentPage"
      :total-pages="totalPages"
      :visible-pages="visiblePages"
      @page-change="goToPage"
    />
  </div>
</template>

<script setup >

import { onMounted, ref, watch, onUnmounted , computed,} from 'vue'; 
import LocalStorageManager from "@/JS/LocalStaorageManager"
import PaginationComponent from './PaginationComponent.vue';
import FilterComponent from './FilterComponent.vue';
import { useActivityStore } from '@/stores/activity';
import { formatDateSpecial } from "@/JS/GlobalFunctions";
import { getEventUrl } from '@/JS/GlobalFunctions';



const eventsPerPage = 9;
const currentPage = ref(0);
const {addFavoritesActivities} = useActivityStore()

const props = defineProps({
  listEvent: Array
});

const likedEvents = ref([])

// toggle like for one event
const toggleLike =async (id) =>{
  if (likedEvents.value.includes(id)) {
    likedEvents.value = likedEvents.value.filter(e => e !== id)
  } else {
    likedEvents.value.push(id)
  }
}

// check if specific event is liked
function isLiked(id) {
  return likedEvents.value.includes(id)
}


const listActivities = ref([]);
const activitiesStore = useActivityStore();

const totalPages = computed(() => Math.ceil(props.listEvent.length / eventsPerPage));

const paginatedEvents = computed(() => {
  const start = currentPage.value * eventsPerPage;
  const end = start + eventsPerPage;
  return props.listEvent.slice(start, end);
});

const visiblePages = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];
  
  let startPage = Math.max(0, currentPage.value - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages.value - 1, startPage + maxVisiblePages - 1);
  
  startPage = Math.max(0, endPage - maxVisiblePages + 1);
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i + 1);
  }
  
  return pages;
});

const goToPage = (pageIndex) => {
  if (pageIndex >= 0 && pageIndex < totalPages.value) {
    currentPage.value = pageIndex;
  }
};


const actualMode = ref(LocalStorageManager.getMode());

let newEvent = ref(null);
  //newEvent.value = actualMode.value ? newEventJours : newEventNuit;

  // Fonction pour mettre à jour l'index du slide actif
  // const onSlideChange = (swiper) => {
  //   indexSlide.value = swiper.activeIndex;
  // };



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