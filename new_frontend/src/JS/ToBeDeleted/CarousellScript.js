import LocalStorageManager from "@/JS/LocalStorageManager";
import Setup from "../Setup";
import { ref } from "vue";

const text =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";

const text1a = "See the event";
const text1b = "Voir l'evenement";
const text2a = "Organisator";
const text2b = "Découvrir les Organisateurs";

const currentSlider = [
  {
    image: "https://picsum.photos/1895/795",
    image2: "https://picsum.photos/286/425",
    title: "Mont-Royal",
    desc: text,
    rating: 1,
  },
  {
    image: "https://picsum.photos/1891/791",
    image2: "https://picsum.photos/287/426",
    title: "Vieux-Port",
    desc: text,
    rating: 3,
  },
  {
    image: "https://picsum.photos/1892/792",
    image2: "https://picsum.photos/288/427",
    title: "Laronde",
    desc: text,
    rating: 5,
  },
  {
    image: "https://picsum.photos/1894/794",
    image2: "https://picsum.photos/289/428",
    title: "Jardin Botanique",
    desc: text,
    rating: 4,
  },
];

const currentSliderNuit = [
  {
    image: "https://picsum.photos/1896/796",
    image2: "https://picsum.photos/286/424",
    title: "Pont Jacque Cartier",
    desc: text,
    rating: 1,
  },
  {
    image: "https://picsum.photos/1897/797",
    image2: "https://picsum.photos/287/426",
    title: "Bateau Mouche de nuit",
    desc: text,
    rating: 4,
  },
  {
    image: "https://picsum.photos/1898/798",
    image2: "https://picsum.photos/288/427",
    title: "Casino",
    desc: text,
    rating: 2,
  },
  {
    image: "https://picsum.photos/1899/799",
    image2: "https://picsum.photos/289/428",
    title: "La Voute",
    desc: text,
    rating: 3.5,
  },
];

export default {
  data() {
    let actualMode = Setup.modeSetup();
    let actualLang = Setup.languageSetup();

    return {
      actualMode, // Intégration d'actualMode dans le data
      actualLang,
      carouselItems: actualMode.value ? currentSlider : currentSliderNuit,
      textEvent: ref(actualLang.value ? text1a : text1b),
      textOrganisator: ref(actualLang.value ? text2a : text2b),
      timeRunning: 3000,
      timeAutoNext: 5000,
      runTimeOut: null,
      runNextAuto: null,
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
      this.$router.push({ name: "Event" });
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
    },
    handleLangChange(event) {
      this.actualLang.value = JSON.parse(event.detail.storage);
    },
  },
  mounted() {
    window.addEventListener("mode-changed", this.handleModeChange);
    window.addEventListener("lang-changed", this.handleLangChange);
    this.setNextAuto();
  },
  beforeUnmount() {
    window.removeEventListener("mode-changed", this.handleModeChange);
    window.removeEventListener("lang-changed", this.handleLangChange);
  },
  watch: {
    actualMode(newVal) {
      console.log("Mode changed: ", newVal);
      this.carouselItems = newVal ? currentSlider : currentSliderNuit;
    },
    actualLang(newVal) {
      this.textEvent = newVal ? text1a : text1b;
      this.textOrganisator = newVal ? text2a : text2b;
    },
  },
};
