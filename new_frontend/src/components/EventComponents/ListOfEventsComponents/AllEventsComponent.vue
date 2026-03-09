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
          <strong>{{ item.titre }}</strong>
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
    <PaginationComponent :lenght="paginationLenght" :page="page" @paginationChanged="paginationUpdate"/>
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
  let actualEventMode = ref(null);
  let paginationLenght = ref(null)
  const fakeevents = FakeDataBase.getNewEvents();

  const pagination = ref(null)
  let page = ref(null)
  let parameterPerPage = ref(null);
  let parameterPage = ref(null);
  let parameter = ref(null);//ref("per_page=9&page=1");
  let allEvent = ref(null);
  let events = ref(null);
  const width = ref(window.innerWidth);

  const perPageFunction = async () => {
    if (width.value >= 1025) {
      parameterPerPage.value = 9;
    } else {
      parameterPerPage.value = 6;
    }
  }

  const setup = async () => {
    await perPageFunction()
    //console.log('perPage -> ' + parameterPerPage.value )
    const events = LocalStorageManager.getActualPaginationNumber()
    page = events != null ? events.number : 1
    //console.log('page -> ' + page)
    //console.log('parameter -> ' + parameter.value)
    return 'per_page=' + parameterPerPage.value + '&page=' + page;
  }

  const paginationUpdate = (index, filter = null) => {
    parameter = 'per_page=' + parameterPerPage.value + '&page=' + index;
    //console.log('pagination update : ' + parameter)
    PaginationManager.getPaginationEvents(parameter, filter)
  }

  

  function updateDimensions() {
    width.value = window.innerWidth;
  }

  const setEvent = (value) => {
    LocalStorageManager.setEvent(value);
    //console.log("event value : ", value);
  };

  const getPaginationLenght = () => {
    if(actualEventMode.value === 'days') { 
      paginationLenght.value = pagination.value.days 
      console.log("pagination lenght updated (days) -> " + paginationLenght.value)
    }
    else if(actualEventMode.value === 'nights') { 
      paginationLenght.value = pagination.value.night 
      console.log("pagination lenght updated (night) -> " + paginationLenght.value)
    }
    else { 
      paginationLenght.value = pagination.value.all 
      console.log("pagination lenght updated (all) -> " + paginationLenght.value)
    }
    //console.log("pagination lenght updated -> " + paginationLenght.value)
  }
  
  const getEvents = () => {
    allEvent.value = LocalStorageManager.getActualPaginationNumber();
    events.value = actualMode ? allEvent.value.days : allEvent.value.nights;
    //console.log('all events : ', events.value)
  };

 const handleTagChange = (event) => {
    let tag = LocalStorageManager.getTag()
    let filter = tag == null ? null : "type=" + tag;
    console.log('tag cherched ' + filter + " page = " + page)
    paginationUpdate(page, filter)
  };

    const handleEventModeChange = (event) => {
    actualEventMode.value = event.detail.storage.data;
    getPaginationLenght()
  };

  const handleStorageChange = (event) => {
    getEvents()
  };

  watch(actualMode, (newVal, oldVal) => {
    events.value = newVal ? allEvent.value.days : allEvent.value.nights;
  });

  watch(width, async (newVal, oldVal) => {
    //console.log('watch size')
    if (oldVal >= 1025 && newVal < 1025) {
      parameterPerPage.value = 6;
      parameter.value = 'per_page=' + parameterPerPage.value + '&page=' + page;
      //console.log('Retour petit ecrant :', newVal);
      //console.log('parameterPerPage -> ' + parameterPerPage.value + ' page -> ' + page)
      LocalStorageManager.setActualPaginationNumber(null);
      events.value = null;
      //console.log('parameter -> ' + parameter.value)
      pagination.value = await PaginationManager.paginationSetup(parameter.value)
    }
    else if (oldVal < 1025 && newVal >= 1025) {
      parameterPerPage.value = 9;
      parameter.value = 'per_page=' + parameterPerPage.value + '&page=' + page;
      //console.log('Retour plein écran :', newVal);
      //console.log('parameterPerPage -> ' + parameterPerPage.value + ' page -> ' + page)
      LocalStorageManager.setActualPaginationNumber(null);
      events.value = null;
      //console.log('parameter -> ' + parameter.value)
      pagination.value = await PaginationManager.paginationSetup(parameter.value)
    }
  });

  onMounted(async () => {
    parameter.value = await setup()
    const tempActualEventMode = await Setup.eventModeSetup();
    actualEventMode.value = tempActualEventMode.value;
    //console.log('parameter 2 -> ' + parameter.value)
    pagination.value = await PaginationManager.paginationSetup(parameter.value)
    //PaginationManager.paginationStatus()
    window.addEventListener(
      "ActualPaginationNumber-changed",
      handleStorageChange
    );
    
    window.addEventListener('resize', updateDimensions);
    window.addEventListener("eventMode-changed", handleEventModeChange);
    window.addEventListener("tag-changed", handleTagChange);
    getPaginationLenght()
    getEvents()
  })
</script>

<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyle.scss"></style>
<style src="../../../styles/ComponentsStyles/EventStyles/ListOfEventStyle/AllEventsStyleColor.scss"></style>