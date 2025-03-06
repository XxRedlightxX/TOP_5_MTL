<template>
    <div id="singleEventComponent">
        <div class="place-overview">
            <header class="header">
                <h1 class="header__title">{{event.title}}</h1>
                <br>
            </header>

            <section class="overview">
                <div class="overview__image">
                    <img :src="event.image" alt="Mont Saint-Michel" />
                </div>
                <div class="overview__details">
                    <h3 class="overview__description">{{event.desc}}</h3>
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

<style src="../../../styles/EventsStyles/SingleEventsStyles/SingleEventComponentStyle.scss"></style>