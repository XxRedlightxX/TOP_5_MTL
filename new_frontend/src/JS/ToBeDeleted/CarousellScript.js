import LocalStorageManager from "@/JS/LocalStorageManager";
import Setup from "../Setup";
import FakeDataBase from "./FakeDataBase";
import { ref } from "vue";

const text1a = "See the event";
const text1b = "Voir l'evenement";
const text2a = "Organisator";
const text2b = "Découvrir les Organisateurs";
const events = FakeDataBase.getCarousellEvent();

export default {
  data() {
    let actualMode = Setup.modeSetup();
    let actualLang = Setup.languageSetup();

    return {
      actualMode, // Intégration d'actualMode dans le data
      actualLang,
      carouselItems: actualMode.value ? events.eventJour : events.eventNuit,
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
      this.carouselItems = newVal ? events.eventJour : events.eventNuit;
    },
    actualLang(newVal) {
      this.textEvent = newVal ? text1a : text1b;
      this.textOrganisator = newVal ? text2a : text2b;
    },
  },
};
