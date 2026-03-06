/**
 * ==========================================================
 * MODULE : Setup
 * ==========================================================
 * 🧩 Rôle :
 *  Gestion centralisée des données locales (LocalStorage)
 *  avec réactivité (Vue 3) et synchronisation automatique via
 *  des CustomEvents pour maintenir un état global cohérent
 *  dans toute l’application MTL’s Source.
 *
 * 🛠 Technologies :
 *  - Vue 3 (ref, onMounted, onUnmounted)
 *  - LocalStorageManager (lecture/écriture du stockage local)
 *  - CustomEvent pour la propagation des changements
 *
 * 🔄 Fonctionnement général :
 *  Chaque méthode `SetupXxx()` :
 *    1. Crée une variable réactive `ref()` basée sur LocalStorage.
 *    2. Initialise la valeur si elle est absente (`nullInitialiser`).
 *    3. Écoute les changements via un `CustomEvent` (xxx-changed).
 *    4. Retire proprement l’écouteur à la destruction du composant.
 *
 * 📦 Exemples d’utilisation :
 *  ```js
 *  const actualMode = Setup.modeSetup();        // Thème sombre/clair
 *  const currentLang = Setup.languageSetup();   // Langue active
 *  const isLoggedIn = Setup.loginSetup();       // Statut de connexion
 *  ```
 */

import { ref, onMounted, onUnmounted } from "vue";
import LocalStorageManager from "@/JS/LocalStorageManager";
import { useActivityStore } from "@/stores/activity";

const Setup = {
  /**
   * ----------------------------------------------------------
   * MODE JOUR / NUIT
   * ----------------------------------------------------------
   * Initialise et gère le mode d’affichage (dark / light).
   * Met à jour automatiquement quand un `mode-changed` est émis.
   *
   * @returns {Ref<boolean>} Référence réactive du mode actuel (true = mode jour)
   */
  modeSetup() {
    const actualMode = ref(LocalStorageManager.getMode());

    Setup.nullInitialiser(
      actualMode,
      LocalStorageManager.setMode,
      LocalStorageManager.getMode,
      true, // valeur par défaut = mode jour activé
    );

    const handleModeChange = (event) => {
      actualMode.value = JSON.parse(event.detail.storage);
    };

    window.addEventListener("mode-changed", handleModeChange);

    return actualMode;
  },

  /**
   * ----------------------------------------------------------
   * LANGUE DE L’APPLICATION
   * ----------------------------------------------------------
   * Initialise et gère la langue sélectionnée par l’utilisateur.
   * Synchronisation automatique via `lang-changed`.
   *
   * @returns {Ref<string>} Langue actuelle (ex: "fr", "en")
   */
  languageSetup() {
    const actualLang = ref(LocalStorageManager.getLanguage());

    Setup.nullInitialiser(
      actualLang,
      LocalStorageManager.setLanguage,
      LocalStorageManager.getLanguage,
      "fr", // valeur par défaut = français
    );

    const handleLanguageChange = (event) => {
      actualLang.value = JSON.parse(event.detail.storage);
    };

    window.addEventListener("lang-changed", handleLanguageChange);

    return actualLang;
  },

  /**
   * ----------------------------------------------------------
   * EVENTMODE JOUR / NUIT / ALL
   * ----------------------------------------------------------
   * Initialise et gère le eventMode d’affichage (darkEvent / lightEvent / allEvent).
   * Met à jour automatiquement quand un `eventMode-changed` est émis.
   *
   * @returns {Ref<boolean>} Référence réactive du eventMode actuel
   */
  async eventModeSetup() {
    const actualEventMode = ref(LocalStorageManager.getEventMode());
    const mode = await Setup.modeSetup();
    const eventModeDefaultValue = mode ? "days" : "nights";

    Setup.nullInitialiser(
      actualEventMode,
      LocalStorageManager.setEventMode,
      LocalStorageManager.getEventMode,
      eventModeDefaultValue,
    );
    return actualEventMode;
  },

  /**
   * ----------------------------------------------------------
   * ÉVÉNEMENT SÉLECTIONNÉ
   * ----------------------------------------------------------
   * Conserve l’événement actuellement visualisé ou sélectionné.
   * Synchronisation via `event-changed`.
   *
   * @returns {Ref<object>} Événement actuel (vide si aucun)
   */
  eventSetup() {
    const actualEvent = ref(LocalStorageManager.getEvent());

    Setup.nullInitialiser(
      actualEvent,
      LocalStorageManager.setEvent,
      LocalStorageManager.getEvent,
      {}, // valeur par défaut = objet vide
    );

    const handleEventChange = (event) => {
      actualEvent.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener("event-changed", handleEventChange);
    });

    onUnmounted(() => {
      window.removeEventListener("event-changed", handleEventChange);
    });

    return actualEvent;
  },

  /**
   * ----------------------------------------------------------
   * ÉTAT DE CONNEXION
   * ----------------------------------------------------------
   * Gère la variable de connexion globale (connecté ou non).
   * Met à jour quand `login-changed` est émis.
   *
   * @returns {Ref<boolean>} Statut de connexion actuel
   */
  loginSetup() {
    const actualLogin = ref(LocalStorageManager.getLogin());

    Setup.nullInitialiser(
      actualLogin,
      LocalStorageManager.setLogin,
      LocalStorageManager.getLogin,
      false, // valeur par défaut = non connecté
    );

    const handleLoginChange = (event) => {
      actualLogin.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener("login-changed", handleLoginChange);
    });

    onUnmounted(() => {
      window.removeEventListener("login-changed", handleLoginChange);
    });

    return actualLogin;
  },

  /**
   * ----------------------------------------------------------
   * UTILISATEUR CONNECTÉ
   * ----------------------------------------------------------
   * Gère les informations de l’utilisateur actuellement connecté.
   * Synchronisation automatique via `logUserr-changed`.
   *
   * @returns {Ref<object>} Données utilisateur (vide si non connecté)
   */
  userSetup() {
    const actualUser = ref(LocalStorageManager.getLogUser());

    Setup.nullInitialiser(
      actualUser,
      LocalStorageManager.setLogUser,
      LocalStorageManager.getLogUser,
      {}, // valeur par défaut = objet vide
    );

    const handleUserChange = (event) => {
      actualUser.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener("logUserr-changed", handleUserChange);
    });

    onUnmounted(() => {
      window.removeEventListener("logUserr-changed", handleUserChange);
    });

    return actualUser;
  },

  /**
   * ----------------------------------------------------------
   * ORGANISATEUR ACTUEL
   * ----------------------------------------------------------
   * Gère les informations de l’organisateur affiché.
   * Met à jour quand `organisator-changed` est détecté.
   *
   * @returns {Ref<object>} Données de l’organisateur actif
   */
  organisatorSetup() {
    const actualOrganisator = ref(LocalStorageManager.getOrganisator());

    Setup.nullInitialiser(
      actualOrganisator,
      LocalStorageManager.setOrganisator,
      LocalStorageManager.getOrganisator,
      {}, // valeur par défaut = objet vide
    );

    const handleOrganisatorChange = (event) => {
      actualOrganisator.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener("organisator-changed", handleOrganisatorChange);
    });

    onUnmounted(() => {
      window.removeEventListener(
        "organisator-changed",
        handleOrganisatorChange,
      );
    });

    return actualOrganisator;
  },

  /**
   * ----------------------------------------------------------
   * MÉTHODE UTILITAIRE GÉNÉRIQUE
   * ----------------------------------------------------------
   * Vérifie si une valeur issue du LocalStorage est `null`.
   * Si c’est le cas, initialise une valeur par défaut et la
   * sauvegarde via le setter associé.
   *
   * @param {Ref<any>} valueRef - Référence réactive surveillée
   * @param {Function} setter - Fonction pour écrire dans LocalStorage
   * @param {Function} getter - Fonction pour relire la valeur du LocalStorage
   * @param {any} [defaultValue=true] - Valeur par défaut si le stockage est vide
   */
  nullInitialiser(valueRef, setter, getter, defaultValue = true) {
    if (valueRef.value === null) {
      setter(defaultValue);
      valueRef.value = getter();
    }
  },
};

export default Setup;
