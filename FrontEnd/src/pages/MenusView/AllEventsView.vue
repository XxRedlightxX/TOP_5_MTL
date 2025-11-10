<template>
  
    <div id="allEventView">
        
        <ListcategorieEvent></ListcategorieEvent>
        <div>
            <h3>{{ actualLang ? 'Up coming events' : 'Événement en approche'}}</h3>
            <UpComingEvent  :list-event="upComingEvents" />
        </div>
      

        <AlListEvent :list-event="eventsList"/>
    </div>
</template>

<script setup>
    import ListcategorieEvent from "../../components/EventComponents/ListOfEventsComponents/EventFilterComponent.vue"
    import UpComingEvent from '../../components/EventComponents/ListOfEventsComponents/UpComingEventComponent.vue'
    import AlListEvent from "../../components/EventComponents/ListOfEventsComponents/AllEventsComponent.vue"
    import LocalStorageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted, watch, computed} from "vue";
    import { useActivityStore } from '@/stores/activity';
    import Notification from "@/components/NotificationComponent.vue";


    const actualMode = ref(LocalStorageManager.getMode());
    let actualLang = ref(LocalStorageManager.getLang());
    const activitiesStore = useActivityStore();
    let eventsList = ref(null);
    let upComingEvents = ref([]);

   
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    
    const newEventJours = [
    { id: null,
image: "https://picsum.photos/1895/795", title: "Mont-Royal", desc: text, rating: 3,lieu: null, date_debut:null }
  ];

  const newEventNuit = [
    {id :null,image : "https://picsum.photos/1895/795", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
  ];



    upComingEvents = computed(() => {
    return activitiesStore.upcomingactivities.map(activity => ({
        id: activity.id,
        image: activity.image_data || "https://picsum.photos/1895/795",
        title: activity.titre,
        desc: activity.description || "No description available",
        rating: parseFloat(activity.nombre_likes) || 0,
        lieu: activity.lieu,
        date: activity.date_debut,
    }));
});



  eventsList.value = actualMode.value ? newEventJours : newEventNuit;

  onMounted(async () => {
    await activitiesStore.getActivities();
     await activitiesStore.getUpcomingEvents();
  });

  eventsList = computed(() => {
  return activitiesStore.activities.map(activity => ({
    id: activity.id,
    image: activity.image_data,
    title: activity.titre,
    desc: activity.description || "No description",
    rating: activity.rating || 0,
    lieu: activity.lieu,
    date: activity.date_debut,
  }));
})



 

   watch(actualMode, (newVal, oldVal) => {
      eventsList.value = newVal ? newEventJours : newEventNuit;
      console.log( eventsList.value);
   });
   

    if (actualLang.value === null) {
        LocalStorageManager.setLang(true);
        actualLang.value = LocalStorageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    
  // Add event listener for Lang changes
  onMounted(() => {
    window.addEventListener('lang-changed', handleLangChange);
  });

  // Remove event listener when component is unmounted
  onUnmounted(() => {
    window.removeEventListener('lang-changed', handleLangChange);
  });
</script>

<style src="../../styles/MenusViewStyles/AllEventViewStyle.scss"></style>
