/**
 * LocalStorageManager
 * ====================
 * Gestion centralisée du stockage des données dans localStorage
 * + émission d'événements personnalisés pour la synchronisation réactive.
 *
 * Principe :
 *  - Chaque donnée (mode, langue, login, user, etc.) est stockée dans localStorage au format JSON.
 *  - À chaque modification, un événement personnalisé "xxx-changed" est dispatché.
 *  - Les composants Vue (via Setup.js) écoutent ces événements et se mettent à jour automatiquement.
 *
 * Exemple :
 *   LocalStorageManager.setMode(true);
 *   const mode = LocalStorageManager.getMode(); // => true
 *
 * Événements émis :
 *   - mode-changed
 *   - lang-changed
 *   - event-changed
 *   - login-changed
 *   - logUserr-changed
 *   - organisator-changed
 *   - HightEvent-changed
 *   - NewEvent-changed
 *   - UpcomingEvent-changed
 */
const LocalStorageManager = {
  /** --------------------------
   * SECTION : CONFIGURATION GLOBALE
   * -------------------------- */

  /** Définit le mode dark/light */
  setMode(value) {
    localStorage.setItem("mode", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("mode-changed", {
        detail: { storage: localStorage.getItem("mode") },
      })
    );
  },

  /** Récupère le mode dark/light */
  getMode() {
    const mode = localStorage.getItem("mode");
    return mode ? JSON.parse(mode) : null;
  },

  /** Définit la langue */
  setLanguage(value) {
    localStorage.setItem("lang", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("lang-changed", {
        detail: { storage: localStorage.getItem("lang") },
      })
    );
  },

  /** Récupère la langue */
  getLanguage() {
    const lang = localStorage.getItem("lang");
    return lang ? JSON.parse(lang) : null;
  },

  /** --------------------------
   * SECTION : ÉVÉNEMENTS
   * -------------------------- */

  /**
   * Définit l'événement affiché dans la page "single event"
   * @param {object} value objet événement
   */
  setEvent(value) {
    localStorage.setItem("event", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("event-changed", {
        detail: { storage: localStorage.getItem("event") },
      })
    );
  },

  /** Récupère l'événement affiché */
  getEvent() {
    const event = localStorage.getItem("event");
    return event ? JSON.parse(event) : null;
  },

  /**
   * Définit les événements les mieux notés
   * @param {Array} value liste d’événements
   */
  setHightRateEvents(value) {
    localStorage.setItem("HightEvent", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("HightEvent-changed", {
        detail: { storage: localStorage.getItem("HightEvent") },
      })
    );
  },

  /** Récupère les événements les mieux notés */
  getHightRateEvents() {
    const hightEvent = localStorage.getItem("HightEvent");
    return hightEvent ? JSON.parse(hightEvent) : null;
  },

  /**
   * Définit les nouveaux événements
   * @param {Array} value liste d’événements récents
   */
  setNewEvents(value) {
    localStorage.setItem("NewEvent", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("NewEvent-changed", {
        detail: { storage: localStorage.getItem("NewEvent") },
      })
    );
  },

  /** Récupère les nouveaux événements */
  getNewEvents() {
    const newEvent = localStorage.getItem("NewEvent");
    return newEvent ? JSON.parse(newEvent) : null;
  },

  /**
   * Définit les événements à venir
   * @param {Array} value liste d’événements à venir
   */
  setUpcomingEvents(value) {
    localStorage.setItem("UpcomingEvent", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("UpcomingEvent-changed", {
        detail: { storage: localStorage.getItem("UpcomingEvent") },
      })
    );
  },

  /** Récupère les événements à venir */
  getUpcomingEvents() {
    const upcomingEvent = localStorage.getItem("UpcomingEvent");
    return upcomingEvent ? JSON.parse(upcomingEvent) : null;
  },

  /** --------------------------
   * SECTION : AUTHENTIFICATION
   * -------------------------- */

  /** Définit l'état de connexion */
  setLogin(value) {
    localStorage.setItem("login", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("login-changed", {
        detail: { storage: localStorage.getItem("login") },
      })
    );
  },

  /** Récupère l'état de connexion */
  getLogin() {
    const login = localStorage.getItem("login");
    return login ? JSON.parse(login) : null;
  },

  /** Définit l'utilisateur connecté */
  setLogUser(value) {
    localStorage.setItem("logUserr", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("logUserr-changed", {
        detail: { storage: localStorage.getItem("logUserr") },
      })
    );
  },

  /** Récupère l'utilisateur connecté */
  getLogUser() {
    const logUser = localStorage.getItem("logUserr");
    return logUser ? JSON.parse(logUser) : null;
  },

  /** --------------------------
   * SECTION : ORGANISATEUR
   * -------------------------- */

  /** Définit l'organisateur affiché */
  setOrganisator(value) {
    localStorage.setItem("organisator", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("organisator-changed", {
        detail: { storage: localStorage.getItem("organisator") },
      })
    );
  },

  /** Récupère l'organisateur affiché */
  getOrganisator() {
    const organisator = localStorage.getItem("organisator");
    return organisator ? JSON.parse(organisator) : null;
  },

  /** --------------------------
   * SECTION : UTILITAIRES
   * -------------------------- */

  /**
   * Change la valeur du mode (toggle ou assignation directe)
   * @param {Boolean} [value] - Nouvelle valeur du Mode (optionnel)
   * @returns {Boolean} nouvelle valeur du Mode
   */
  changeMode(value) {
    const actualMode =
      typeof value === "boolean" ? value : !LocalStorageManager.getMode();
    LocalStorageManager.setMode(actualMode);
    return actualMode;
  },

  /**
   * Change la valeur du language (toggle ou assignation directe)
   * @param {Boolean} [value] - Nouvelle valeur du Langage (optionnel)
   * @returns {Boolean} nouvelle valeur du Langage
   */
  changeLanguage(value) {
    const actualLang =
      typeof value === "boolean" ? value : !LocalStorageManager.getLanguage();
    LocalStorageManager.setLanguage(actualLang);
    return actualLang;
  },

  /** Déconnecte l'utilisateur */
  logout() {
    LocalStorageManager.setLogin(false);
    LocalStorageManager.setLogUser(null);
    return LocalStorageManager.getLogin();
  },

  /** Connecte l'utilisateur */
  login(user) {
    LocalStorageManager.setLogUser(user);
    LocalStorageManager.setLogin(true);
    return LocalStorageManager.getLogin();
  },
};

export default LocalStorageManager;