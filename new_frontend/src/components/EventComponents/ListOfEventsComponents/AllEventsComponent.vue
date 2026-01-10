<template>
  <div v-if="events != null" id="AllEventComponent">
    <FilterComponent/>
    <div class="events">

      <router-link v-for="(item, index) in events" :key="index" class="events_card glass" to="event">
        <div class="event_card_photo">
          <!-- Main image -->
          <img :src="item.image_data" class="product-thumb" alt="Event Image">
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
    <PaginationComponent :lenght="pagination" :page="page" @paginationChanged="paginationUpdate"/>
  </div>

  <div v-else id="AllEventComponent">
    <FilterComponent/>
    <div class="events">

      <router-link v-for="(item, index) in fakeevents.eventJour" :key="index" class="events_card glass" to="event">
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
    <PaginationComponent />
    <LoadingComponent />
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
  import LoadingComponent from '@/components/StaticComponents/LoadingComponent.vue';

  const actualMode = Setup.modeSetup();
  const fakeevents = FakeDataBase.getNewEvents();

  const pagination = ref(null)
  let page = ref(null)
  let parameterPerPage = 9;
  let parameterPage = ref(null);
  let parameter = ref(null);//ref("per_page=9&page=1");

  const paginationUpdate = (index) => {
    parameter = 'per_page=' + parameterPerPage + '&page=' + index;
    PaginationManager.getPaginationEvents(parameter)
  }

  let allEvent = ref(null);
  let events = ref(null);
  //newEvent.value = actualMode.value ? events.eventJour : events.eventNuit;

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    console.log("event value : ", value);
  };

  const getEvents = () => {
    allEvent.value = LocalStorageManager.getActualPaginationNumber();
    events.value = actualMode ? allEvent.value.days : allEvent.value.nights;
    //console.log('all events : ', events.value)
  };

  const setup = async () => {
    const event = LocalStorageManager.getActualPaginationNumber()
    page = event != null ? event.number : 1
    console.log('page -> ' + page)
    parameter = 'per_page=' + parameterPerPage + '&page=' + page;
  };

  watch(actualMode, (newVal, oldVal) => {
    events.value = newVal ? allEvent.value.days : allEvent.value.nights;
  });
  
  const handleStorageChange = (event) => {
    getEvents()
    
  };
  onMounted(async () => {
    await setup()
    pagination.value = await PaginationManager.paginationSetup(parameter.value)
    //PaginationManager.paginationStatus()
    window.addEventListener(
      "ActualPaginationNumber-changed",
      handleStorageChange
    );
    getEvents()
  })
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyleColor.scss"></style>