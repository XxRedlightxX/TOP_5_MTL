/**
 * LocalStorageManager
 * ====================
 * Gestion centralisée du stockage des données dans localStorage
 * + émission d'événements personnalisés pour la synchronisation réactive.
 *
 * Principe :
 *  - Chaque donnée (mode, langue, login, user, etc.) est stockée dans localStorage
 *    au format JSON.
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
 */
const LocalStorageManager = {
  /**
   * Définit le mode dark/light
   * @param {boolean} value true = dark, false = light
   */
  setMode(value) {
    localStorage.setItem("mode", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("mode-changed", {
        detail: { storage: localStorage.getItem("mode") },
      })
    );
  },

  /**
   * Récupère le mode dark/light
   * @returns {boolean|null} mode actuel ou null si non défini
   */
  getMode() {
    const mode = localStorage.getItem("mode");
    return mode ? JSON.parse(mode) : null;
  },

  /**
   * Définit la langue
   * @param {boolean} value ex: true = "fr", false = "en"
   */
  setLanguage(value) {
    localStorage.setItem("lang", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("lang-changed", {
        detail: { storage: localStorage.getItem("lang") },
      })
    );
  },

  /**
   * Récupère la langue
   * @returns {boolean|null} langue actuelle ou null si non défini.  ex: true = "fr", false = "en"
   */
  getLanguage() {
    const lang = localStorage.getItem("lang");
    return lang ? JSON.parse(lang) : null;
  },

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

  /**
   * Récupère l'événement affiché
   * @returns {object|null} objet event ou null si non défini
   */
  getEvent() {
    const event = localStorage.getItem("event");
    return event ? JSON.parse(event) : null;
  },

  /**
   * Définit l'état de connexion
   * @param {boolean} value true = connecté, false = déconnecté
   */
  setLogin(value) {
    localStorage.setItem("login", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("login-changed", {
        detail: { storage: localStorage.getItem("login") },
      })
    );
  },

  /**
   * Récupère l'état de connexion
   * @returns {boolean|null} true/false ou null si non défini
   */
  getLogin() {
    const login = localStorage.getItem("login");
    return login ? JSON.parse(login) : null;
  },

  /**
   * Définit l'utilisateur connecté
   * @param {object} value objet user
   */
  setLogUser(value) {
    localStorage.setItem("logUserr", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("logUserr-changed", {
        detail: { storage: localStorage.getItem("logUserr") },
      })
    );
  },

  /**
   * Récupère l'utilisateur connecté
   * @returns {object|null} objet user ou null si non défini
   */
  getLogUser() {
    const logUser = localStorage.getItem("logUserr");
    return logUser ? JSON.parse(logUser) : null;
  },

  /**
   * Définit l'organisateur affiché
   * @param {object} value objet organisateur
   */
  setOrganisator(value) {
    localStorage.setItem("organisator", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("organisator-changed", {
        detail: { storage: localStorage.getItem("organisator") },
      })
    );
  },

  /**
   * Récupère l'organisateur affiché
   * @returns {object|null} objet organisateur ou null si non défini
   */
  getOrganisator() {
    const organisator = localStorage.getItem("organisator");
    return organisator ? JSON.parse(organisator) : null;
  },

  /**
   * Change la valeur du mode pour l'inverse du mode actual. Ex : Mode : true (WhiteMode) => false(DarkMode)
   * @returns {Boolean} nouvelle valeur du Mode
   */
  changeMode() {
    const actualMode = !this.getMode();
    this.setMode(actualMode);
    return actualMode;
  },

  /**
   * Change la valeur du language pour l'inverse du language actual. Ex : language : true (FR) => false(EN)
   * @returns 
   */
  changeLanguage() {
    const actualLang = !this.getLanguage();
    this.setLanguage(actualLang);
    return actualLang;
  }
};

export default LocalStorageManager;
