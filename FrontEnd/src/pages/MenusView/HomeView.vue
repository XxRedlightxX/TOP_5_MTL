<template>
    <div id="homeView">
        <Carousel/>
        <CarousellPhone/>
        <div class="homeContent">
            <IntroText/>
            <NewEvent :list-event="eventsList"/><!---->
            <Contact/>
        </div>
    </div>
</template>

<script setup>
    import Carousel from "../../components/HomeComponents/CarouselComponent.vue"
    import CarousellPhone from "../../components/HomeComponents/CarouselPhoneComponent.vue"
    import IntroText from "../../components/HomeComponents/IntroTextComponent.vue"
    import NewEvent from "../../components/HomeComponents/NewEventComponent.vue"
    import Contact from "../../components/HomeComponents/ContactComponent.vue"
    import { ref, onMounted, onUnmounted, watch} from "vue";
    import { useActivityStore } from '@/stores/activity';

    let eventsList = ref(null);
    const text ="dada"

    const activitiesStore = useActivityStore();

      const newEventJours = [
        { 
            id: null,
            image: "https://picsum.photos/1895/795",
            title: "Mont-Royal",
            desc: text, rating: null,
            lieu: null, date:null 
        },
    ]

    



     onMounted(async () => {
      await activitiesStore.getActivities("JOUR");

      eventsList.value = activitiesStore.activities.map(activity => ({
        id : activity.id,
        image: activity.image_data || "https://picsum.photos/1895/795",
        title: activity.titre,
        desc: activity.description || descText,
        rating: activity.rating || 0,
        lieu: activity.lieu,
        date: activity.date,
      }));
  });

   eventsList.value =  newEventJours;
   

  
</script>

<style src="../../styles/MenusViewStyles/HomeViewStyle.scss"></style>