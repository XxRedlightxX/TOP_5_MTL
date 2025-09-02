<template>
    <div id="allEventView">
        <ListcategorieEvent></ListcategorieEvent>
        <div>
            <h3>{{ actualLang ? 'Up coming events' : 'Evenement en approche'}}</h3>
            <UpComingEvent :list-event="eventsList"/>
        </div>
            <select v-model="activitiesStore.filters.daytime">
        <option value="">All times</option>
        <option value="JOUR">JOUR</option>
        <option value="NUIT">Afternoon</option>
        <option value="evening">Evening</option>
    </select>

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


    const actualMode = ref(LocalStorageManager.getMode());
    let actualLang = ref(LocalStorageManager.getLang());
    const activitiesStore = useActivityStore();
    let eventsList = ref(null);
    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
      const newEventJours = [
    { id: null,
image: "https://picsum.photos/1895/795", title: "Mont-Royal", desc: text, rating: 3,lieu: null, date:null },
    { id: null,
image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 5,lieu: null, date:null },
    {id: null,
image: "https://picsum.photos/1894/793", title: "Laronde", desc: text, rating: 1 ,lieu: null, date:null},
    { id: null,
image: "https://picsum.photos/1895/796", title: "Jardin Botanique", desc: text, rating: 2.5,lieu: null, date:null },
    { id: null,
image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 3 ,lieu: null, date:null},
    { id: null,
image: "https://picsum.photos/1894/793", title: "Laronde", desc: text, rating: 4 ,lieu: null, date:null},
    {id: null,
image: "https://picsum.photos/1895/795", title: "Mont-Royal", desc: text, rating: 3.5 ,lieu: null, date:null},
    { id: null,
image: "https://picsum.photos/1895/796", title: "Jardin Botanique", desc: text, rating: 1.5,lieu: null, date:null },
    { id: null,
image: "https://picsum.photos/1895/794", title: "Vieux-Port", desc: text, rating: 4.5 ,lieu: null, date:null}
  ];

  const newEventNuit = [
    {id :null,image : "https://picsum.photos/1895/795", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {id :null ,image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {id :null ,image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 },
    {id :null,image : "https://picsum.photos/1892/795", title: "Casino", desc: text, rating: 2 },
    {id:null ,image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {id:null ,image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 },
    {id:null ,image : "https://picsum.photos/1894/795", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {id:null ,image : "https://picsum.photos/1892/795", title: "Casino", desc: text, rating: 2 },
    {id:null ,image : "https://picsum.photos/1893/795", title: "La Voute", desc: text, rating: 3.5 }
  ];

    /*onMounted(async () => {
      await activitiesStore.getActivities();

      eventsList.value = activitiesStore.activities.map(activity => ({
        id : activity.id,
        image: activity.image_data || "https://picsum.photos/1895/795",
        title: activity.titre,
        desc: activity.description || descText,
        rating: activity.rating || 0,
        lieu: activity.lieu,
        date: activity.date,
      }));
  });*/
  eventsList.value = actualMode.value ? newEventJours : newEventNuit;

  onMounted(async () => {
    await activitiesStore.getActivities();
  });

  eventsList = computed(() => {
  return activitiesStore.activities.map(activity => ({
    id: activity.id,
    image: activity.image_data || "https://picsum.photos/1895/795",
    title: activity.titre,
    desc: activity.description || "No description",
    rating: activity.rating || 0,
    lieu: activity.lieu,
    date: activity.date,
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
