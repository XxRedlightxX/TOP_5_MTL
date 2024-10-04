import LocalStorageManager from "@/JS/LocalStaorageManager";
import { ref } from 'vue';

const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";

const currentSlider = [
    { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
    { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
    { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
    { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 }
];

const currentSliderNuit = [
    { image: "/src/assets/HomeCarousel/Pont-Jaque-Cartier-Nuit.jpg", title: "Pont Jacque Cartier", desc: text, rating: 1 },
    { image: "/src/assets/HomeCarousel/Bateau-mouche-nuit.jpg", title: "Bateau Mouche de nuit", desc: text, rating: 4 },
    { image: "/src/assets/HomeCarousel/Casino-nuit.jpg", title: "Casino", desc: text, rating: 2 },
    { image: "/src/assets/HomeCarousel/La-voute-nuit.jpg", title: "La Voute", desc: text, rating: 3.5 }
];

export default {
  data() {
    let actualMode = ref(LocalStorageManager.getMode());

    // Définit un mode par défaut si `actualMode` n'existe pas
    if (actualMode.value == null) {
      LocalStorageManager.setMode(true);
      actualMode.value = LocalStorageManager.getMode();
    }

    return {
      actualMode,  // Intégration d'actualMode dans le data
      carouselItems: actualMode.value ? currentSlider : currentSliderNuit,
      timeRunning: 3000,
      timeAutoNext: 5000,
      runTimeOut: null,
      runNextAuto: null
    };
  },
  methods: {
    setEvent(value) {
      LocalStorageManager.setEvent(value);
      console.log("Event value: ", value);
    },
    handleClick(event, item) {
      event.preventDefault();
      this.setEvent(item);
      this.$router.push({ name: 'Event' });
    },
    showSlider(direction) {
      if (direction === "next") {
        this.carouselItems.push(this.carouselItems.shift());
      } else {
        this.carouselItems.unshift(this.carouselItems.pop());
      }
      this.resetSlider();
    },
    resetSlider() {
      clearTimeout(this.runTimeOut);
      this.runTimeOut = setTimeout(() => {
        this.$el.classList.remove("next", "prev");
      }, this.timeRunning);
      clearTimeout(this.runNextAuto);
      this.setNextAuto();
    },
    setNextAuto() {
      this.runNextAuto = setTimeout(() => {
        this.showSlider("next");
      }, this.timeAutoNext);
    },
    handleModeChange(event) {
      this.actualMode = JSON.parse(event.detail.storage); // Assigne la nouvelle valeur du mode
    }
  },
  mounted() {
    window.addEventListener('mode-changed', this.handleModeChange);
  },
  beforeUnmount() {
    window.removeEventListener('mode-changed', this.handleModeChange);
  },
  watch: {
    actualMode(newVal) {
      console.log("Mode changed: ", newVal);
      this.carouselItems = newVal ? currentSlider : currentSliderNuit;
    }
  }
};