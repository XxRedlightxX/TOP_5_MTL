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
  let parameterPerPage = ref(null);
  let parameterPage = ref(null);
  let parameter = ref(null);//ref("per_page=9&page=1");
  let allEvent = ref(null);
  let events = ref(null);
  const width = ref(window.innerWidth);

  if (width.value >= 1025) {
    parameterPerPage.value = 9;
  } else {
    parameterPerPage.value = 6;
  }

  const paginationUpdate = (index) => {
    parameter = 'per_page=' + parameterPerPage + '&page=' + index;
    PaginationManager.getPaginationEvents(parameter)
  }

  function updateDimensions() {
    width.value = window.innerWidth;
  }

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
    parameter.value = 'per_page=' + parameterPerPage.value + '&page=' + page;
  };

  watch(actualMode, (newVal, oldVal) => {
    events.value = newVal ? allEvent.value.days : allEvent.value.nights;
  });

  watch(width, async (newVal, oldVal) => {
    if (oldVal >= 1025 && newVal < 1025) {
      parameterPerPage.value = 6;
      parameter.value = 'per_page=' + parameterPerPage.value + '&page=' + page;
      console.log('Retour petit ecrant :', newVal);
      console.log('parameterPerPage -> ' + parameterPerPage.value + ' page -> ' + page)
      LocalStorageManager.setActualPaginationNumber(null);
      events.value = null;
      console.log('parameter -> ' + parameter.value)
      pagination.value = await PaginationManager.paginationSetup(parameter.value)
    }
    else if (oldVal < 1025 && newVal >= 1025) {
      parameterPerPage.value = 9;
      parameter.value = 'per_page=' + parameterPerPage.value + '&page=' + page;
      console.log('Retour plein écran :', newVal);
      console.log('parameterPerPage -> ' + parameterPerPage.value + ' page -> ' + page)
      LocalStorageManager.setActualPaginationNumber(null);
      events.value = null;
      console.log('parameter -> ' + parameter.value)
      pagination.value = await PaginationManager.paginationSetup(parameter.value)
    }
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
    
    window.addEventListener('resize', updateDimensions);
    getEvents()
  })
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyleColor.scss"></style>