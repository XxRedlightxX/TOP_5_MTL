/**
 * ----------------------------------------------------------
 * MODULE : SetupEvents
 * ----------------------------------------------------------
 * Ce module gère la logique d’initialisation, de mise à jour et
 * de synchronisation des différents types d’événements (les mieux notés,
 * nouveaux, à venir) en fonction du mode jour/nuit.
 *
 * Il s'appuie sur :
 * - Pinia (store d'activités)
 * - LocalStorageManager (pour la persistance)
 * - CustomEvent (pour la réactivité inter-composants)
 * - Vue (refs + lifecycle hooks)
 *
 * Chaque méthode spécifique (higherRate, new, upcoming) utilise
 * une version générique pour centraliser la logique commune.
 */

import { onMounted, onUnmounted, ref } from "vue";
import LocalStorageManager from "@/JS/LocalStorageManager";
import { useActivityStore } from "@/stores/activity";
import Setup from "./Setup";

const SetupEvents = {
  /**
   * ----------------------------------------------------------
   * SECTION : GESTION DES ÉVÉNEMENTS GÉNÉRIQUES
   * ----------------------------------------------------------
   */

  /**
   * Initialise dynamiquement un type d’événement (higherRate, new, upcoming).
   * Gère la récupération depuis le localStorage ou depuis l’API,
   * puis met en place la synchronisation via les CustomEvents.
   *
   * @async
   * @param {String} storageKey - Clé du localStorage (ex: "HightEvent", "NewEvent")
   * @param {String} eventName - Nom de l’événement personnalisé écouté (ex: "HightEvent-changed")
   * @param {Function} fetchFunction - Méthode du store Pinia pour récupérer les données API
   * @param {Function} setFunction - Fonction pour stocker les données dans le localStorage
   * @param {Function} getFunction - Fonction pour lire les données depuis le localStorage
   * @returns {Ref<Array>} Référence réactive contenant la liste d’événements filtrés selon le mode
   */
  async eventsSetupGeneric(
    storageKey,
    eventName,
    fetchFunction,
    setFunction,
    getFunction
  ) {
    const storedData = ref(getFunction());

    // Si aucun événement n'est enregistré, récupération depuis l'API
    if (storedData.value == null) {
      const activitiesStore = useActivityStore();
      const apiData = await fetchFunction.call(activitiesStore);
      storedData.value = SetupEvents.setListOfEvents(apiData);
      setFunction(storedData.value);
    }

    /**
     * Synchronisation réactive :
     * Met à jour les données locales lorsqu’un CustomEvent est émis ailleurs.
     */
    const handleStorageChange = (event) => {
      storedData.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener(eventName, handleStorageChange);
    });

    onUnmounted(() => {
      window.removeEventListener(eventName, handleStorageChange);
    });

    return storedData.value; // SetupEvents.actualEventsSetupGeneric(storedData);
  },

  /**
   * Filtre dynamiquement les événements selon le mode jour/nuit courant.
   * Se met à jour automatiquement quand le mode change.
   *
   * @param {Ref<Object>} eventsData - Données brutes réactives des événements
   * @returns {Ref<Array>} Liste réactive d’événements adaptés au mode actuel
   */
  actualEventsSetupGeneric(eventsData) {
    const actualMode = ref(LocalStorageManager.getMode());
    const actualEvents = ref([]);

    /**
     * Met à jour la liste selon le mode :
     * - true : mode jour → eventsJour
     * - false : mode nuit → eventsNuit
     */
    const updateEventsByMode = () => {
      actualEvents.value = actualMode.value
        ? eventsData.value.eventsJour
        : eventsData.value.eventsNuit;
    };

    // Initialisation
    updateEventsByMode();

    // Écoute le changement de mode global
    const handleModeChange = (event) => {
      actualMode.value = JSON.parse(event.detail.storage);
      updateEventsByMode();
    };

    onMounted(() => {
      window.addEventListener("mode-changed", handleModeChange);
    });

    onUnmounted(() => {
      window.removeEventListener("mode-changed", handleModeChange);
    });

    return actualEvents;
  },

  /**
   * ----------------------------------------------------------
   * SECTION : MÉTHODES SPÉCIFIQUES
   * ----------------------------------------------------------
   */

  /**
   * Initialise la configuration des événements les mieux notés (Higher Rate)
   * et les rend réactifs au mode jour/nuit.
   *
   * @async
   * @returns {Ref<Array>} Liste réactive des meilleurs événements
   */
  async higherRateEventsSetup() {
    return await SetupEvents.eventsSetupGeneric(
      "HightEvent",
      "HightEvent-changed",
      useActivityStore().getHigherRateEvent,
      LocalStorageManager.setHightRateEvents,
      LocalStorageManager.getHightRateEvents
    );
  },

  /**
   * Gère la version actualisée du getter HigherRate (selon le mode)
   *
   * @param {Ref<Object>} higherRateEvents - Données d’événements "Higher Rate"
   * @returns {Ref<Array>} Liste d’événements adaptés au mode actuel
   */
  // actualHigherRateEventsSetup(higherRateEvents) {
  //   return Setup.actualEventsSetupGeneric(higherRateEvents);
  // },

  /**
   * Initialise la configuration des nouveaux événements (New Events)
   * et assure leur mise à jour automatique selon le mode.
   *
   * @async
   * @returns {Ref<Array>} Liste réactive des nouveaux événements
   */
  async newEventsSetup() {
    return await SetupEvents.eventsSetupGeneric(
      "NewEvent",
      "NewEvent-changed",
      useActivityStore().getNewEvent,
      LocalStorageManager.setNewEvents,
      LocalStorageManager.getNewEvents
    );
  },

  /**
   * Gère la version actualisée des nouveaux événements selon le mode jour/nuit.
   *
   * @param {Ref<Object>} newEvents - Données réactives des nouveaux événements
   * @returns {Ref<Array>} Liste d’événements filtrés selon le mode
   */
  // actualnewEventsSetup(newEvents) {
  //   return Setup.actualEventsSetupGeneric(newEvents);
  // },

  /**
   * Initialise la configuration des événements à venir (Upcoming Events)
   * et les rend réactifs au mode jour/nuit.
   *
   * @async
   * @returns {Ref<Array>} Liste réactive des événements à venir
   */
  async upcomingEventSetup() {
    return await SetupEvents.eventsSetupGeneric(
      "UpcomingEvent",
      "UpcomingEvent-changed",
      useActivityStore().getUpcomingEvent,
      LocalStorageManager.setUpcomingEvents,
      LocalStorageManager.getUpcomingEvents
    );
  },

  /**
   * Gère la version actualisée des événements à venir selon le mode jour/nuit.
   *
   * @param {Ref<Object>} upcomingEvents - Données réactives des événements à venir
   * @returns {Ref<Array>} Liste d’événements filtrés selon le mode
   */
  // actualupcomingEventSetup(upcomingEvents) {
  //   return Setup.actualEventsSetupGeneric(upcomingEvents);
  // },

  /**
   * ----------------------------------------------------------
   * SECTION : OUTILS
   * ----------------------------------------------------------
   */

  setListOfEvents(data) {
    const organizedData = ref([]);
    const descriptionText = "Description not found";
    const defaultImage = "https://picsum.photos/640/480"; // Fallback image

    if (Array.isArray(data)) {
      // ✅ Cas : l’API retourne un tableau d’événements (ton cas actuel)
      organizedData.value = data.map((activity) => ({
        id: activity.id,
        image: activity.image_data || defaultImage,
        image2: activity.image_data2 || defaultImage,
        title: activity.titre,
        desc: activity.description || descriptionText,
        rating: Number.parseFloat(activity.nombre_likes) || 0,
        lieu: activity.lieu,
        date_debut: activity.date_debut,
        date_fin: activity.date_fin,
        statut_journee: activity.statut_journee,
        utilisateur_id: activity.utilisateur_id,
        type_id: activity.type_id,
        saison_id: activity.saison_id,
      }));
    } else if (data && Array.isArray(data.activities)) {
      // ⚙️ Cas ancien format : { activities: [...] }
      organizedData.value = data.activities.map((activity) => ({
        id: activity.id,
        image: activity.image_data || defaultImage,
        image2: activity.image_data2 || defaultImage,
        title: activity.titre,
        desc: activity.description || descriptionText,
        rating: Number.parseFloat(activity.nombre_likes) || 0,
        lieu: activity.lieu,
        date_debut: activity.date_debut,
        date_fin: activity.date_fin,
        statut_journee: activity.statut_journee,
        utilisateur_id: activity.utilisateur_id,
        type_id: activity.type_id,
        saison_id: activity.saison_id,
      }));
    } else {
      console.warn("⚠️ Données inattendues dans setListOfEvents :", data);
    }

    //console.log("✅ organised value :", organizedData.value);
    return organizedData.value;
  },
};

export default SetupEvents;
