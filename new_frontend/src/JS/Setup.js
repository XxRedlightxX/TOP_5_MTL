import { ref, onMounted, onUnmounted } from "vue";
import LocalStorageManager from "@/JS/LocalStorageManager";

/**
 * Setup : gestion centralisée des données stockées dans LocalStorage
 * avec réactivité Vue (ref) et synchronisation automatique via des events.
 *
 * Chaque méthode SetupXxx :
 *  - Initialise une valeur réactive (ref) à partir de LocalStorage
 *  - Si la valeur est absente, l'initialise avec une valeur par défaut
 *  - Écoute les événements personnalisés ("xxx-changed") pour rester synchro
 *  - Nettoie l'écouteur d'événement lors du démontage du composant
 *
 * Exemple d'utilisation dans un composant :
 *    const actualMode = Setup.modeSetup();
 *    const actualLang = Setup.languageSetup();
 */
const Setup = {
  /**
   * Gère le mode dark/light (booléen)
   * @returns {Ref<boolean>} mode actuel
   */
  modeSetup() {
    const actualMode = ref(LocalStorageManager.getMode());

    Setup.nullInitialiser(
      actualMode,
      LocalStorageManager.setMode,
      LocalStorageManager.getMode,
      true // valeur par défaut = dark mode activé
    );

    const handleModeChange = (event) => {
      actualMode.value = JSON.parse(event.detail.storage);
    };

    onMounted(() => {
      window.addEventListener("mode-changed", handleModeChange);
    });

    onUnmounted(() => {
      window.removeEventListener("mode-changed", handleModeChange);
    });

    return actualMode;
  },

  /**
   * Gère la langue sélectionnée (string)
   * @returns {Ref<string>} langue actuelle
   */
  languageSetup() {
    const actualLang = ref(LocalStorageManager.getLanguage());

    Setup.nullInitialiser(
      actualLang,
      LocalStorageManager.setLanguage,
      LocalStorageManager.getLanguage,
      true // valeur par défaut = français
    );

    const handleLanguageChange = (event) => {
      actualLang.value = JSON.parse(event.detail.storage);
    };

    //     const handleLanguageChange = (event) => {
    //   actualLang.value = !!JSON.parse(event.detail.storage); // force bool
    // };

    onMounted(() => {
      window.addEventListener("lang-changed", handleLanguageChange);
    });

    onUnmounted(() => {
      window.removeEventListener("lang-changed", handleLanguageChange);
    });

    return actualLang;
  },

  /**
   * Gère l'événement sélectionné (objet)
   * @returns {Ref<object>} event actuel
   */
  eventSetup() {
    const actualEvent = ref(LocalStorageManager.getEvent());

    Setup.nullInitialiser(
      actualEvent,
      LocalStorageManager.setEvent,
      LocalStorageManager.getEvent,
      {} // valeur par défaut = objet vide
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
   * Gère l'état de connexion (booléen)
   * @returns {Ref<boolean>} login actuel
   */
  loginSetup() {
    const actualLogin = ref(LocalStorageManager.getLogin());

    Setup.nullInitialiser(
      actualLogin,
      LocalStorageManager.setLogin,
      LocalStorageManager.getLogin,
      false // valeur par défaut = pas connecté
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
   * Gère l'utilisateur connecté (objet)
   * @returns {Ref<object>} utilisateur actuel
   */
  userSetup() {
    const actualUser = ref(LocalStorageManager.getLogUser());

    Setup.nullInitialiser(
      actualUser,
      LocalStorageManager.setLogUser,
      LocalStorageManager.getLogUser,
      {} // valeur par défaut = objet vide
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
   * Gère l'organisateur affiché (objet)
   * @returns {Ref<object>} organisateur actuel
   */
  organisatorSetup() {
    const actualOrganisator = ref(LocalStorageManager.getOrganisator());

    Setup.nullInitialiser(
      actualOrganisator,
      LocalStorageManager.setOrganisator,
      LocalStorageManager.getOrganisator,
      {} // valeur par défaut = objet vide
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
        handleOrganisatorChange
      );
    });

    return actualOrganisator;
  },

  /**
   * Méthode utilitaire générique :
   * - Vérifie si une valeur est `null` dans LocalStorage
   * - Si oui, initialise avec une valeur par défaut
   * - Retourne toujours une ref synchronisée
   *
   * @param {Ref<any>} valueRef ref réactive
   * @param {Function} setter fonction setter de LocalStorageManager
   * @param {Function} getter fonction getter de LocalStorageManager
   * @param {any} defaultValue valeur par défaut si null
   */
  nullInitialiser(valueRef, setter, getter, defaultValue = true) {
    if (valueRef.value === null) {
      setter(defaultValue);
      valueRef.value = getter();
    }
  },
};

export default Setup;
