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
                <div :class="index == 0 ? 'titlee' : 'lostTitle'">{{ item.title }}</div>

                    <div :class="index == 0 ? 'buttons' : 'lostBouttons'">
                        <router-link to="/Event" class="btn roundBorderSmall" @click="setEvent(item)">Voir l'evenement</router-link>
                        <router-link to="/Event Organisator" class="btn roundBorderSmall" @click="setEvent(item)">Découvrir les Organisateurs</router-link>
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
            <img :src="item.image2" class=" roundBorderSmall">
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

<script src="../../JS/HomeCarousellScript.js" ></script>



<style src="../../styles/HomesStyles/CarrouselComponentStyle.scss"></style>