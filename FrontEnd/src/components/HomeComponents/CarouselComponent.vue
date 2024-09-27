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
                        <router-link to="/Event" class="btn roundBorderSmall" @click="setEvent(item)">Voir l'evenement</router-link>
                        <router-link to="/Event" class="btn roundBorderSmall" @click="setEvent(item)">Découvrir les Organisateurs</router-link>
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

<script>
import LocalStorageManager from "@/JS/LocalStaorageManager";
import { ref, onMounted, onUnmounted } from 'vue'


const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque."
const actualMode = ref(LocalStorageManager.getMode());

if (actualMode.value == null){
    LocalStorageManager.setMode(true);
    actualMode.value = LocalStorageManager.getMode();
}
const handleModeChange = (event) => {
    actualMode.value = JSON.parse(event.detail.storage);
};

// Add event listener for mode changes
onMounted(() => {
    window.addEventListener('mode-changed', handleModeChange);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
    window.removeEventListener('mode-changed', handleModeChange);
});

const currentSlider = [
    {image : "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
    {image : "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
    {image : "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
    {image : "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 }
]
const currentSliderNuit = [
    {image : "/src/assets/HomeCarousel/Pont-Jaque-Cartier-Nuit.jpg", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    {image : "/src/assets/HomeCarousel/Bateau-mouche-nuit.jpg", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    {image : "/src/assets/HomeCarousel/Casino-nuit.jpg", title: "Casino", desc: text, rating: 2 },
    {image : "/src/assets/HomeCarousel/La-voute-nuit.jpg", title: "La Voute", desc: text, rating: 3.5 }
]

export default {
data() {
  return {
    // Tableau pour stocker les éléments du carrousel
    carouselItems: actualMode.value ? currentSlider : currentSliderNuit,
    // Temps avant que l'animation de transition ne se termine (en millisecondes)
    timeRunning: 3000,
    // Temps avant de passer automatiquement à l'élément suivant (en millisecondes)
    timeAutoNext: 5000,
    // Stocke l'ID du timeout pour réinitialiser le slider
    runTimeOut: null,
    // Stocke l'ID du timeout pour passer automatiquement à l'élément suivant
    runNextAuto: null,
  };
},
methods: {
  setEvent(value) {
    LocalStorageManager.setEvent(value);
    console.log("Event value: ", value);
  },
  handleClick(event, item) {
    event.preventDefault(); // Empêche la navigation immédiate
    this.setEvent(item);
    // Après avoir défini l'event, autorise la navigation
    this.$router.push({ name: 'Event' });
  },
    // Fonction pour afficher l'élément suivant ou précédent du carrousel
    showSlider(direction) {
        // Si la direction est "next", déplace le premier élément à la fin du tableau
        if (direction === "next") {
            this.carouselItems.push(this.carouselItems.shift());
        } else { // Sinon, déplace le dernier élément au début du tableau
            this.carouselItems.unshift(this.carouselItems.pop());
        }
        // Réinitialise le slider après l'animation
        this.resetSlider();
    },
        // Réinitialise le slider en supprimant les classes CSS et réinitialise les timers
    resetSlider() {
        clearTimeout(this.runTimeOut); // Annule tout timeout existant pour l'animation
        this.runTimeOut = setTimeout(() => {
            // Supprime les classes CSS 'next' et 'prev' après l'animation
            this.$el.classList.remove("next", "prev");
        }, this.timeRunning);
    
        clearTimeout(this.runNextAuto); // Annule tout timeout pour l'automatisation suivante
        this.setNextAuto(); // Redéfinit le timeout pour passer à l'élément suivant
    },
        // Définir un timeout pour passer automatiquement à l'élément suivant
    setNextAuto() {
        this.runNextAuto = setTimeout(() => {
            this.showSlider("next"); // Passe à l'élément suivant automatiquement
        }, this.timeAutoNext);
    },
    
}
};
</script>

<style src="../../styles/HomesStyles/CarrouselComponentStyle.scss"></style>