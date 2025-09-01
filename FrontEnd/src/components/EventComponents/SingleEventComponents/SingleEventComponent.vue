<template>
    <div id="singleEventComponent">
        <div class="place-overview" >
            <header class="header">
                <h1 class="header__title">{{activityTitle}}</h1>
                <br>
            </header>

            <section class="overview">
                <div class="overview__image">
                    <img :src="getAvatarUrl(event.image)" alt="Mont Saint-Michel" />
                </div>
                <div class="overview__details">
                    <h3 class="overview__description">{{activityDesc}}</h3>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, defineProps } from 'vue';
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import { useActivityStore } from '@/stores/activity';
    import { useRoute } from 'vue-router';
    import { getAvatarUrl } from '@/JS/GlobalFunctions';

    //const activity = ref(null);

    defineProps({
        activityTitle: String,
        activityDesc: String
    });
  

    const route = useRoute()
    const {getActivityById} = useActivityStore();

    /*onMounted (async ()  =>
        activity.value = await getActivityById(route.params.id) 
    );*/
    

    const event = ref(LocalStorageManager.getEvent())

    const defaultEvent = { 
        image: "/src/assets/vieuxport-ete2023-br100524_web(c)2023_benoit_rousseau.webg.jpg", 
        title: "Mont Saint-Michel", 
        desc: "Le Mont Saint-Michel est une île rocheuse située en Normandie, en France.Connue pour son abbaye médiévale et son architecture spectaculaire, c'est l'un des sites les plus visités du pays.",
        rating: 3 
    }

    if( event.value == null){
        event.value = defaultEvent
    }

    
</script>

<style src="../../../styles/EventsStyles/SingleEventsStyles/SingleEventComponentStyle.scss"></style>