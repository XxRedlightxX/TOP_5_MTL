<template>
  <div v-if="pagination != null" id="AllEventComponent">
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
    <PaginationComponent :lenght="pagination" @paginationChanged="paginationUpdate"/>
  </div>
</template>

<script setup>
  import { onMounted, ref, watch, onUnmounted } from 'vue';
  import LocalStorageManager from '@/JS/LocalStorageManager';
  import Setup from '@/JS/Setup';
  import FilterComponent from './FilterComponent.vue';
  import PaginationComponent from './PaginationComponent.vue';
  import FakeDataBase from '@/JS/ToBeDeleted/FakeDataBase';
  import PaginationManager from '@/JS/PaginationManager';

  const actualMode = Setup.modeSetup();
  //const events = FakeDataBase.getNewEvents();

  const pagination = ref(null)
  const parameter = ref("per_page=9&page=2");

  const paginationUpdate = (index) => {
    PaginationManager.getPaginationEvents(index)
  }

  let newEvent = ref(null);
  //newEvent.value = actualMode.value ? events.eventJour : events.eventNuit;

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    console.log("event value : ", value);
  };

  // // Correction du watcher
  // watch(actualMode, (newVal, oldVal) => {
  //   newEvent.value = newVal ? events.eventJour : events.eventNuit;
  // });

  onMounted(async () => {
    pagination.value = await PaginationManager.paginationSetup(parameter.value)
    //PaginationManager.paginationStatus()
    newEvent.value = LocalStorageManager.getActualPaginationNumber();
    console.log('all events : ', newEvent)
  })
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyleColor.scss"></style>