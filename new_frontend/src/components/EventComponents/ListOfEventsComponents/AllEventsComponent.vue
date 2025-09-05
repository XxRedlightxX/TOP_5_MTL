<template>
  <div id="AllEventComponent">
    <FilterComponent/>
    <div class="events">

      <router-link v-for="(item, index) in newEvent" :key="index" class="events_card glass" to="event">
        <div class="event_card_photo">
          <!-- Main image -->
          <img :src="item.image" class="product-thumb" alt="Event Image">
        </div>

        <div class="desc">
          <strong>{{ item.title }}</strong>
          <div class="d1">
            <v-icon icon="mdi-map-marker " :class="['icon', {'justGlow' : !actualMode}]"/>
            {{ item.lieu }}
          </div>
          <div class="d2">
            <v-icon icon="mdi-clock-outline " :class="['icon', {'justGlow' : !actualMode}]"/>
            <!-- {{ formatDateSpecial(item.date) }} -->{{ item.date }}
          </div>
        </div>
      </router-link>
    </div>
    <PaginationComponent/>
  </div>
</template>

<script setup>

  import { onMounted, ref, watch, onUnmounted } from 'vue';
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import Setup from '@/JS/Setup';
  import FilterComponent from './FilterComponent.vue';
  import PaginationComponent from './PaginationComponent.vue';
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase';

  // import { useActivityStore } from '@/stores/activity';
  // import { formatDateSpecial } from "@/JS/GlobalFunctions";

  // const listActivities = ref([]);
  // const activitiesStore = useActivityStore();

  // const getAvatarUrl = (imagePath) => {
  //   if (!imagePath) return img;
  //   return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
  // };

  // onMounted(async () => {
  //   await activitiesStore.getActivities();

  //   newEvent.value = activitiesStore.activities.map(activity => ({
  //     id: activity.id,
  //     image: activity.image || "https://picsum.photos/1895/795",
  //     title: activity.titre,
  //     desc: activity.description || descText,
  //     rating: activity.rating || 0,
  //     lieu: activity.lieu,
  //     date: activity.date,
  //   }));
  // });
  const actualMode = Setup.modeSetup();
  const events = FakeDataBase.getNewEvents();

  let newEvent = ref(null);
  newEvent.value = actualMode.value ? events.eventJour : events.eventNuit;

  // Fonction pour mettre à jour l'index du slide actif
  // const onSlideChange = (swiper) => {
  //   indexSlide.value = swiper.activeIndex;
  // };

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    console.log("event value : ", value);
  };

  // Correction du watcher
  watch(actualMode, (newVal, oldVal) => {
    newEvent.value = newVal ? events.eventJour : events.eventNuit;
  });
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyleColor.scss"></style>