<template>
    <div id="profileListEventComponent">
    
      <div class="head">
        <h4 v-if="props.himself">{{  actualLang ? 'List of events you add' : 'Les événements que vous avez ajoutés' }}</h4>
        <h4 v-else>{{  actualLang ? 'List of event the organisator publish' : 'Les evenements que l\'organisateur a publier' }}</h4>
       
        <div @click="showAdd2()"  class="router"  v-show="props.himself">
            <v-icon data-testid="add-event-icon" icon="mdi-plus-box-multiple" class="icon" :title="actualLang ? 'Add an Event' : 'Ajouter un evenement'"/>
        </div>

      </div>
  
      <div class="body" >
        <LoadingUserEvents v-if="isLoading" /> 
        <ProfileSingleEvent 
      v-if="props.himself"
      v-for="item in props.user.listEvent" 
      :key="item.id" 
      :event="item" 
      :himself="true" 
      @popUpdate="showUp2(item.id)" 
      @popDelete="showDel2(item.id)"
    />

    <ProfileSingleEvent 
      v-else
      v-for="(item, index) in props.user" 
      :key="index" 
      :event="item" 
      :himself="false" 
      @popUpdate="showUp2(item.id)" 
      @popDelete="showDel2(item.id)"
    />
      </div>

        
      <AddEvent ref="addEventRef" @pop="showAdd2()" v-if="isShowAdd2 && props.himself"/>
      <UpdateEvent  :eventId="selectedEventId" @popUpdate="showUp2()" v-if="isShowUp2 && props.himself"/>
      <DeleteEvent :eventId="selectedEventId"  @popDelete="showDel2()" v-if="isShowDel2 && props.himself"/>
    </div>
  </template>
  
<script setup>
  import storageManager from "@/JS/LocalStaorageManager";
  import { ref, onMounted, onUnmounted, defineProps, nextTick, computed } from "vue";
  import ProfileSingleEvent from "./ProfileSingleEventComponent.vue";
  import AddEvent from "./profileEventComponents/AddEventComponent.vue"
  import UpdateEvent from "./profileEventComponents/UpdateEventComponent.vue"
  import DeleteEvent from "./profileEventComponents/DeleteEventComponent.vue"
  import LoadingUserEvents from "../LoadingUserEvents.vue";
  import { useActivityStore } from "@/stores/activity";

  const activityStore = useActivityStore();

  const isLoading = computed(() => activityStore.isLoading)
  const props = defineProps({
        himself: Boolean, // Boolean type prop
        user: Object
  });
  const addEventRef = ref(null);
  let selectedEventId = ref(null);

  
  let actualLang = ref(storageManager.getLang());
  let isLogged = ref(storageManager.getLogin());
  
  const Logout = () => {
    storageManager.setLogin(false);
    isLogged.value = storageManager.getLogin();
  };
  
  if (actualLang.value === null) {
    storageManager.setLang(true);
    actualLang.value = storageManager.getLang();
  }
  
  if (isLogged.value === null) {
    Logout();
  }
  
  // Function to handle mode change event
  const handleLangChange = (event) => {
    actualLang.value = JSON.parse(event.detail.storage);
  };
  
  // Function to handle mode change event
  const handleLoginChange = (event) => {
    isLogged.value = JSON.parse(event.detail.storage);
  };
  

  
  // Add event listener for mode changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
    window.addEventListener('login-changed', handleLoginChange);
  });
  
  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
    window.removeEventListener('login-changed', handleLoginChange);
  });

  let isShowAdd2 = ref(false);
  let isShowUp2 = ref(false);
  let isShowDel2 = ref(false);

  const showAdd2 = async () => {

    isShowAdd2.value = !isShowAdd2.value;
     if (isShowAdd2.value) {
        await nextTick();
    setTimeout(() => {
      addEventRef.value?.refreshMap?.();
    }, 300);
    console.log(addEventRef.value+"k")
  }
  }
  const showUp2 = (id) => {
    selectedEventId = id
    isShowUp2.value = !isShowUp2.value;
  }
  const showDel2 = (id) => {
    selectedEventId = id
    isShowDel2.value = !isShowDel2.value;
  }

 
</script>
  

<style src="../../styles/ProfilesStyles/profileListEventComponentStyle.scss"></style>