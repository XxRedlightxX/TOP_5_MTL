const LocalStorageManager = {
  t1: 60 * 30 * 1000, // 1h
  t2: 10 * 1000, // 30 min
  t3: 60 * 60 * 24 * 1000, // 1h

  /** --------------------------
   * SECTION : Generic
   * --------------------------
   */

  /**
   * Stocke une valeur simple dans localStorage sans expiration.
   * @param {String} key - Nom de la clé à utiliser dans localStorage
   * @param {*} value - Valeur à stocker (sera automatiquement convertie en JSON)
   */
  setGeneric(key, value) {
    // Stockage brut au format JSON
    localStorage.setItem(key, JSON.stringify(value));

    // Émission d’un événement global pour permettre à l'application de réagir
    window.dispatchEvent(
      new CustomEvent(key + "-changed", {
        detail: { storage: localStorage.getItem(key) },
      })
    );
  },

  /**
   * Récupère une donnée simple depuis localStorage.
   * @param {String} key - Nom de la clé à lire
   * @returns {*} Valeur JSON décodée ou null si inexistante
   */
  getGeneric(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  /**
   * Stocke une valeur dans localStorage avec une durée d’expiration.
   * @param {String} key - Nom de la clé à stocker
   * @param {*} value - Valeur à sauvegarder
   * @param {Number} duration - Durée de validité en millisecondes
   */
  setWithExpiry(key, value, duration) {
    const now = Date.now();

    const payload = {
      data: value, // Donnée réelle
      expiresAt: now + duration, // Timestamp d’expiration
    };

    // Sauvegarde structurée
    localStorage.setItem(key, JSON.stringify(payload));

    // Notification globale pour synchroniser le changement
    window.dispatchEvent(
      new CustomEvent(key + "-changed", {
        detail: { storage: payload },
      })
    );
  },

  /**
   * Récupère une donnée avec expiration automatique.
   * @param {String} key - Nom de la clé à lire
   * @returns {*} La donnée stockée ou null si expirée / absente
   */
  getWithExpiry(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }

    const payload = JSON.parse(raw);

    // Teste si la donnée est expirée
    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem(key); // Nettoyage automatique
      return null;
    }

    return payload.data;
  },

  /** --------------------------
   *
   * SECTION : CONFIGURATION GLOBALE
   *
   * Gestion du mode (jour/nuit) et de la langue active.
   * Chaque changement déclenche un événement personnalisé
   * pour permettre une synchronisation réactive dans l'application.
   * -------------------------- */

  /**
   * Définit le mode (ex : "day" ou "night") et le stocke dans localStorage.
   * Déclenche ensuite un événement "mode-changed" pour avertir l’UI.
   *
   * @param {string} value - Le mode sélectionné par l'utilisateur.
   */
  setMode(value) {
    LocalStorageManager.setGeneric("mode", value);
  },

  /**
   * Récupère le mode stocké dans localStorage.
   *
   * @returns {string|null} - Le mode enregistré ou null si absent.
   */
  getMode() {
    return LocalStorageManager.getGeneric("mode");
  },

  /**
   * Définit la langue (ex : "fr", "en") et la stocke dans localStorage.
   * Déclenche ensuite un événement "lang-changed" pour actualiser l’UI.
   *
   * @param {string} value - Le code de langue sélectionné.
   */
  setLanguage(value) {
    LocalStorageManager.setGeneric("lang", value);
  },

  /**
   * Récupère la langue stockée dans localStorage.
   *
   * @returns {string|null} - Le code langue enregistré ou null.
   */
  getLanguage() {
    return LocalStorageManager.getGeneric("lang");
  },

  /** --------------------------
   *
   * SECTION : ÉVÉNEMENTS
   *
   * Gestion de différents types d'événements avec expiration automatique.
   * Chaque entrée est stockée avec une date d'expiration (expiresAt).
   * Si la donnée est expirée lors de la lecture, elle est supprimée.
   * -------------------------- */

  /**
   * Stocke l'événement principal avec expiration.
   *
   * @param {any} value - Donnée événement à sauvegarder.
   */
  setEvent(value) {
    LocalStorageManager.setWithExpiry("event", value, LocalStorageManager.t1);
  },

  /**
   * Récupère l'événement principal.
   *
   * @returns {any|null} - Les données ou null si expirées / inexistantes.
   */
  getEvent() {
    return LocalStorageManager.getWithExpiry("event");
  },

  /**
   * Stocke le tag d'événement avec expiration.
   *
   * @param {any} value - Tag à enregistrer.
   */
  setTag(value) {
    LocalStorageManager.setWithExpiry("tag", value, LocalStorageManager.t1);
  },

  /**
   * Récupère le tag stocké.
   *
   * @returns {any|null} - Le tag ou null si expiré.
   */
  getTag() {
    return LocalStorageManager.getWithExpiry("tag");
  },

  /**
   * Stocke les événements les mieux notés.
   *
   * @param {any} value - Données d'événements.
   */
  setHightRateEvents(value) {
    LocalStorageManager.setWithExpiry(
      "HightEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les événements les mieux notés.
   *
   * @returns {any|null}
   */
  getHightRateEvents() {
    return LocalStorageManager.getWithExpiry("HightEvent");
  },

  /**
   * Stocke les événements les mieux notés (version actuelle).
   */
  setActualHightRateEvents(value) {
    LocalStorageManager.setWithExpiry(
      "ActualHightEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les événements "meilleur taux" actuels.
   */
  getActualHightRateEvents() {
    return LocalStorageManager.getWithExpiry("ActualHightEvent");
  },

  /**
   * Stocke les nouveaux événements.
   */
  setNewEvents(value) {
    LocalStorageManager.setWithExpiry(
      "NewEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les nouveaux événements.
   */
  getNewEvents() {
    return LocalStorageManager.getWithExpiry("NewEvent");
  },

  /**
   * Stocke les nouveaux événements actuels.
   */
  setActualNewEvents(value) {
    LocalStorageManager.setWithExpiry(
      "ActualNewEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les nouveaux événements actuels.
   */
  getActualNewEvents() {
    return LocalStorageManager.getWithExpiry("ActualNewEvent");
  },

  /**
   * Stocke les événements à venir.
   */
  setUpcomingEvents(value) {
    LocalStorageManager.setWithExpiry(
      "UpcomingEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les événements à venir.
   */
  getUpcomingEvents() {
    return LocalStorageManager.getWithExpiry("UpcomingEvent");
  },

  /**
   * Stocke les événements à venir actuels.
   */
  setActualUpcomingEvents(value) {
    LocalStorageManager.setWithExpiry(
      "ActualUpcomingEvent",
      value,
      LocalStorageManager.t1
    );
  },

  /**
   * Récupère les événements à venir actuels.
   */
  getActualUpcomingEvents() {
    return LocalStorageManager.getWithExpiry("ActualUpcomingEvent");
  },

  /** --------------------------
   * SECTION : AUTHENTIFICATION
   * -------------------------- */

  /**
   * Stocke l'état de connexion "login" avec expiration automatique.
   * @param {Boolean} value - Valeur du login (true = connecté, false = déconnecté)
   */
  setlogin(value) {
    LocalStorageManager.setWithExpiry("login", value, LocalStorageManager.t3);
  },

  /**
   * Récupère l'état de connexion (login).
   * Retourne null si la donnée est expirée ou absente.
   */
  getlogin() {
    return LocalStorageManager.getWithExpiry("login");
  },

  /**
   * Stocke les données de l'utilisateur connecté (logUser).
   * @param {*} value - Toute donnée utile sur l’utilisateur (token, profil…)
   */
  setLogUser(value) {
    LocalStorageManager.setWithExpiry(
      "logUserr",
      value,
      LocalStorageManager.t3
    );
  },

  /**
   * Récupère les données utilisateur (logUser).
   * Retourne null si expiré ou absent.
   */
  getLogUser() {
    return LocalStorageManager.getWithExpiry("logUserr");
  },

  /** --------------------------
   * SECTION : ORGANISATEUR
   * -------------------------- */

  /**
   * Stocke les données de l'organisateur avec expiration automatique.
   */
  setOrganisator(value) {
    LocalStorageManager.setWithExpiry(
      "organisator",
      value,
      LocalStorageManager.t3
    );
  },

  /**
   * Récupère les données de l’organisateur.
   * Supprime la donnée si expirée.
   */
  getOrganisator() {
    return LocalStorageManager.getWithExpiry("organisator");
  },

  /** --------------------------
   * SECTION : UTILITAIRES
   * -------------------------- */

  /**
   * Change la valeur du mode (toggle si aucun argument).
   * @param {Boolean} [value] - Nouvelle valeur du mode
   * @returns {Boolean} - Mode final appliqué
   */
  changeMode(value) {
    const actualMode =
      typeof value === "boolean" ? value : !LocalStorageManager.getMode();

    LocalStorageManager.setMode(actualMode);
    return actualMode;
  },

  /**
   * Change la valeur de la langue (toggle si aucun argument).
   * @param {Boolean} [value] - Nouvelle valeur du langage
   * @returns {Boolean} - Langue finale appliquée
   */
  changeLanguage(value) {
    const actualLang =
      typeof value === "boolean" ? value : !LocalStorageManager.getLanguage();

    LocalStorageManager.setLanguage(actualLang);
    return actualLang;
  },

  /**
   * Déconnecte complètement l'utilisateur :
   * - login = false
   * - données user = null
   */
  logout() {
    LocalStorageManager.setLogin(false);
    LocalStorageManager.setLogUser(null);
    return LocalStorageManager.getLogin();
  },

  /**
   * Connecte l’utilisateur en définissant :
   * - logUser (profil utilisateur)
   * - login = true
   */
  login(user) {
    LocalStorageManager.setLogUser(user);
    LocalStorageManager.setLogin(true);
    return LocalStorageManager.getLogin();
  },
};

export default LocalStorageManager;
