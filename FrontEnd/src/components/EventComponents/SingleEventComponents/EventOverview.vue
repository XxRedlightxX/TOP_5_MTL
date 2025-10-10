<template>
    <div id="EventOverview">
        <h1> Informations</h1>
        
        <div class="info">
            <div class="lol">
                <p>{{ actualLang ? 'Hosted by ': 'Mise en Ligne par ' }}{{hostName}} </p>
            </div>
            
            <div class="ratings">
                <Ratings :rating=Rating :Rate="false"/>
            </div>
            <h3><strong>{{ actualLang ? 'Location : ': 'Emplacement : ' }}</strong> {{ place }}</h3>
            <h3><strong>{{ actualLang ? 'Open from : ': 'Ouvert de : ' }}</strong> {{ formatDateEventStartandEnd(startDate,endDate) }}</h3>
        </div>
    </div>

</template>

<script setup>
    import { ref, onMounted, onUnmounted } from 'vue';
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import Ratings from "../../RatingComponent.vue"
    import { formatDateEventStartandEnd } from '@/JS/GlobalFunctions';

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

    defineProps ({
        hostName: String,
        place : String,
        Rating: Number,
        startDate: String,
        endDate: String,

    });


    let actualLang = ref(LocalStorageManager.getLang());

    if (actualLang.value === null) {
        LocalStorageManager.setLang(true);
        actualLang.value = LocalStorageManager.getLang();
    }

    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>



<style src="../../../styles/EventsStyles/SingleEventsStyles/EventOverview.scss"> </style>