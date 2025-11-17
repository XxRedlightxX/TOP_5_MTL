<template>
    <div id="homeView">
        <Carousel/>
        <CarousellPhone/>
        <div class="homeContent">
            <IntroText/>
            <NewEvent :list-event="eventsList"/>
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
    import {  onMounted, computed} from "vue";
    import { useActivityStore } from '@/stores/activity';

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


  const eventsList = computed(() => {
    
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

onMounted(async () => {
    await activitiesStore.getUpcomingEvents();
});
   

  
</script>

<style src="../../styles/MenusViewStyles/HomeViewStyle.scss"></style>