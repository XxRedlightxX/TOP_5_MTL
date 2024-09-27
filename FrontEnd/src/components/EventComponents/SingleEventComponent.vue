<template>
    <div id="singleEventComponent">
        <div class="place-overview">
            <header class="header">
            <h1 class="header__title">Aperçu du Lieu : {{event.title}}</h1>
            </header>

            <section class="overview">
                <div class="overview__image">
                    <img :src="event.image" alt="Mont Saint-Michel" />
                </div>
                <div class="overview__details">
                    <h2 class="overview__title">{{event.title}}</h2>
                    <h3 class="overview__description">{{event.desc}}</h3>
                    
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
                    <p class="overview__location"><h3><strong>Lieu :</strong> Normandie, France</h3></p>
                    <p class="overview__hours"><h3><strong>Heures d'ouverture :</strong> 9h - 19h, tous les jours</h3></p>
                </div>
            </section>
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

<style src="../../styles/EventsStyles/SingleEventComponentStyle.scss"></style>