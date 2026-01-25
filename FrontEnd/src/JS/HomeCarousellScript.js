import LocalStorageManager from "@/JS/LocalStaorageManager";
import { useActivityStore } from "@/stores/activity";


const text =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";

const text1a = "See the event";
const text1b = "Voir l'evenement";
const text2a = "Discover our Organizer";
const text2b = "Découvrir les Organisateurs";

const currentSlider = [
  {
    id : null,
    image: "",
    title: "",
    desc: text,
    lieu: null,
    rating: 1,
    date_debut:null 
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
    let mode = LocalStorageManager.getMode();
    let lang = LocalStorageManager.getLang();

    if (mode == null) {
      LocalStorageManager.setMode(true);
      mode = LocalStorageManager.getMode();
    }
    if (lang === null) {
      LocalStorageManager.setLang(true);
      lang = LocalStorageManager.getLang();
    }

    return {
      actualMode: mode,
      actualLang: lang,
      carouselItems: [],
      textEvent: lang ? text1a : text1b,
      textOrganisator: lang ? text2a : text2b,
      timeRunning: 3000,
      timeAutoNext: 5000,
      runTimeOut: null,
      runNextAuto: null,
    };
  },

  computed: {
    activitiesStore() {
      return useActivityStore();
    },

    processedActivities() {
      const storeActivities = this.activitiesStore.carouselItems || [];
      
      console.log('🔄 processedActivities - carouselactivities:', storeActivities);
      console.log('🔄 processedActivities - store mode:', this.activitiesStore.mode);
      
      if (Array.isArray(storeActivities) && storeActivities.length) {
        const mapped = storeActivities.map((act) => ({
          id: act.id,
          image: act.image_data || "/src/assets/Curtain.jpg",
          title: act.titre,
          desc: act.description || "No description available",
          rating: act.note ?? 0,
          lieu: act.lieu,
          date_debut: act.date_debut,
        }));
        console.log('✅ Mapped activities:', mapped);
        return mapped;
      } else {
        const fallback = this.actualMode ? [...currentSlider] : [...currentSliderNuit];
        console.log('🔄 Using fallback:', fallback);
        return fallback;
      }
    }
  },

  watch: {
    processedActivities: {
      immediate: true,
      handler(newActivities) {
        console.log(' Watch triggered - new activities:', newActivities);
        if (JSON.stringify(this.carouselItems) !== JSON.stringify(newActivities)) {
          this.carouselItems = [...newActivities];
          console.log(' carouselItems updated:', this.carouselItems);
        }
      }
    },

    actualMode: {
      handler(newMode) {
        console.log('👀 Mode changed to:', newMode);
        if (!this.activitiesStore.carouselItems || this.activitiesStore.carouselItems.length === 0) {
          this.carouselItems = newMode ? [...currentSlider] : [...currentSliderNuit];
        }
      }
    }
  },

  methods: {
    async loadActivities() {
      await this.activitiesStore.getHigherRateEvent();
    },

    setEvent(value) {
      LocalStorageManager.setEvent(value);
      console.log("Event value: ", value);
    },

    handleClick(event, item) {
      event.preventDefault();
      this.setEvent(item);
      this.$router.push({ name: "Event" });
    },

    
    isValidImagePath (path){
        if (!path || typeof path !== 'string') return false;
        if (path.trim() === '') return false;
        if (path === 'null' || path === 'undefined') return false;
        
        // Check for common image extensions
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
        const hasImageExtension = imageExtensions.some(ext => 
            path.toLowerCase().includes(ext)
        );
        
        return hasImageExtension;
    },

    isFullUrl (path)  {
    return path.startsWith('http') || 
           path.startsWith('data:') || 
           path.startsWith('blob:') || 
           path.startsWith('/');
    },

   getAvatarUrl(imagePath) {
    const img = "/src/assets/Curtain.jpg";

    if (!this.isValidImagePath(imagePath)) {
      return img;
    }

    if (this.isFullUrl(imagePath)) {
      return imagePath;
    }

    return `${import.meta.env.VITE_API_BASE_URL}${imagePath}`;
},




    

    // --- CAROUSEL LOGIC ---
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
        if (this.$el) {
          this.$el.classList.remove("next", "prev");
        }
      }, this.timeRunning);
      clearTimeout(this.runNextAuto);
      this.setNextAuto();
    },

    setNextAuto() {
      this.runNextAuto = setTimeout(() => {
        this.showSlider("next");
      }, this.timeAutoNext);
    },
    // --- END CAROUSEL LOGIC ---

    handleModeChange(event) {
      try {
        const val = JSON.parse(event.detail.storage);
        this.actualMode = val;
      } catch (e) {
        this.actualMode = event.detail.storage === "true";
      }
      this.textEvent = this.actualLang ? text1a : text1b;
      this.textOrganisator = this.actualLang ? text2a : text2b;
    },

    handleLangChange(event) {
      try {
        const val = JSON.parse(event.detail.storage);
        this.actualLang = val;
      } catch (e) {
        this.actualLang = event.detail.storage === "true";
      }
      this.textEvent = this.actualLang ? text1a : text1b;
      this.textOrganisator = this.actualLang ? text2a : text2b;
    }
  },

  async mounted() {
    console.log('🏁 Component mounted');
    window.addEventListener("mode-changed", this.handleModeChange);
    window.addEventListener("lang-changed", this.handleLangChange);

    this.setNextAuto();

    // Load backend events
    await this.loadActivities();
  },

  beforeUnmount() {
    window.removeEventListener("mode-changed", this.handleModeChange);
    window.removeEventListener("lang-changed", this.handleLangChange);
    clearTimeout(this.runTimeOut);
    clearTimeout(this.runNextAuto);
  },
};