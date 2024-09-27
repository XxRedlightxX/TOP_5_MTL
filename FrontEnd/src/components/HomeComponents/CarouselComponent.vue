<template>
    <div id="carouselComponent">
        <!-- list item -->
        <div class="list">
            <div v-for="(item, index) in carouselItems" :key="index" class="item">
            <div class="imgContainer">
                <div class="overlayGrad"></div>
                <img :src="item.image">
            </div>
            <div class="content">
                <div :class="index == 0 ? 'title' : 'lostTitle'">{{ item.title }}</div>

                    <div :class="index == 0 ? 'buttons' : 'lostBouttons'">
                        <router-link :to="{ name: '/Event/:event', params: { event: item } }" class="btn roundBorderSmall">Voir l'evenement</router-link>
                        <router-link :to="{ name: 'Event', params: { event: item } }" class="btn roundBorderSmall">Découvrir les Organisateurs</router-link>
                    </div>
                    <div :class="index == 0 ? 'desc' : 'lostdesc'">
                        <p>{{ item.desc }}</p>
                    </div>
            </div>
            </div>
        </div>
        <!-- list thumbnail -->
        <div class="thumbnail">
            <div v-for="(item, index) in carouselItems" :key="index" class="item">
            <img :src="item.image" class=" roundBorderSmall">
            <div class="content">
                <div class="title">{{ item.title }}</div>
            </div>
            </div>
        </div>
        <!-- next prev -->
        <div class="arrows">
            <button @click="showSlider('prev')"><</button>
            <button @click="showSlider('next')">></button>
        </div>
        <!-- time running -->
        <div class="time"></div>
    </div>
</template>

<script src="../../JS/CarousellScript.js">
    /*import GameCarousell from "../../JS/CarousellScript.js"
    import LocalStorageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted } from 'vue'

    const actualMode = ref(LocalStorageManager.getMode());
    const listSlider = ref(GameCarousell.carouselItems);
    if (actualMode.value == null){
    LocalStorageManager.setMode(true);
    actualMode.value = LocalStorageManager.getMode();
    }
    const handleModeChange = (event) => {
    actualMode.value = JSON.parse(event.detail.storage);
    console.log("valueeeee " , actualMode.value)
    };

    // Add event listener for mode changes
    onMounted(() => {
    window.addEventListener('mode-changed', handleModeChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
    window.removeEventListener('mode-changed', handleModeChange);
    });

    if(actualMode.value == true){
        listSlider.value = GameCarousell.carouselItems
    }
    else {
        listSlider.value = GameCarousell.carouselItemsNuit
    }*/
</script>

<style src="../../styles/HomesStyles/CarrouselComponentStyle.scss"></style>