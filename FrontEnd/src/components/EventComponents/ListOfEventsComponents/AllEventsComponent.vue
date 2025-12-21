<template>
  <div id="AllEventComponent" style="margin-top: 30px;">
     
    <FilterComponent/>
    <LoadingEvents v-if="isLoading"  :eventCount="eventsPerPage" /> 
    <div class="events" >
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
          :size="40"
          :color="isFavorite(item.id) ? 'red' : 'grey'"
          :icon="isFavorite(item.id) ? 'mdi-heart' : 'mdi-heart-outline'"
          @click.stop.prevent="toggleLike(item.id)"
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
            {{ formatDateSpecial(item.date,actualLang ) }}
          </div>
        </div>
      </router-link>
      
      <div v-else class="no-events">
        <p>No events available at the moment.</p>
      </div>
    </div>

   <PaginationComponent
      v-if="!isLoading && paginatedEvents.length"
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
import LoadingEvents from '@/components/LoadingEventsComponents.vue';
import storageManager from '@/JS/LocalStaorageManager';

const activityStore = useActivityStore();
const isLoading = computed(() => activityStore.isLoading)
const favorites = ref(new Set());
const eventsPerPage = 9;
const currentPage = ref(0);


const actualLang = ref(storageManager.getLang());
if (actualLang.value == null) {
  storageManager.setLang(true);
  actualLang.value = storageManager.getLang();
}


const props = defineProps({
  listEvent: Array
});


function successPop() {
  window.$toast("Saved successfully!")
}


const isFavorite = (id) => {
  return favorites.value && favorites.value.has ? favorites.value.has(id) : false
}
// toggle like for one event
const toggleLike = async (eventId) => {
  const result = await activityStore.addFavoritesActivities(eventId) // returns true/false

  if (result) {
    favorites.value.add(eventId)
  } else {
    favorites.value.delete(eventId)
  }
}


async function loadFavorites() {
  const favs = await activityStore.getFavoritesActivities() || [] 
  if (favs && Array.isArray(favs)) {
    favorites.value = new Set(favs.map(fav => fav.id))
  } else {
    favorites.value = new Set()
  }
}




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

onMounted(() => {
  loadFavorites()
})


  const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
  };


if (actualMode.value == null){
      LocalStorageManager.setMode(true);
      actualMode.value = LocalStorageManager.getMode();
  }
  // Correction du watcher
  watch(actualMode, (newVal, oldVal) => {
    //newEvent.value = newVal ? newEventJours : newEventNuit;
  });
  
  const handleModeChange = (event) => {
      actualMode.value = JSON.parse(event.detail.storage);
  };
    // Add event listener for mode changes
  onMounted(() => {
      window.addEventListener('mode-changed', handleModeChange);
      window.addEventListener('lang-changed', handleLangChange);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
      window.removeEventListener('mode-changed', handleModeChange);
      window.addEventListener('lang-changed', handleLangChange);
  });

</script>

<style src="../../../styles/EventsStyles/EventAllComponentStyle.scss"></style>