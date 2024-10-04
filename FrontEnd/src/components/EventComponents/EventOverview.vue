<template>
    <div id="EventOverview">
        <h1> Informations</h1>
        
        <div class="info">
            <div class="lol">
                <p>Hosted By Jean-Pierre Du Lac  </p>
            </div>
            
            <div class="ratings">
                <v-rating
                readonly
                half-increments
                :length="5"
                :size="32"
                :model-value="event.rating"
                active-color="primary"
                class="rat"
                />
            </div>
            <h3><strong>Lieu :</strong> Normandie, France</h3>
            <h3><strong>Heures d'ouverture :</strong> 9h - 19h, tous les jours</h3>
        </div>
    </div>

</template>

<script setup>
    import { ref } from 'vue';
    import LocalStorageManager from "@/JS/LocalStaorageManager";

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

    console.log("event get : ", event.value);
</script>



<style src="../../styles/EventsStyles/EventOverview.scss"> </style>