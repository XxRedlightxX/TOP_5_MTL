const LocalStorageManager = {
  t1: 60 * 30 * 1000, // 1h
  t2: 10 * 1000, // 30 min

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
  setMode (value) {
  // Stockage brut au format JSON
    localStorage.setItem('mode', JSON.stringify(value))

    // Notification globale pour écouter ce changement ailleurs
    window.dispatchEvent(
      new CustomEvent('mode-changed', {
        detail: { storage: localStorage.getItem('mode') },
      }),
    )
  },

  /**
   * Récupère le mode stocké dans localStorage.
   *
   * @returns {string|null} - Le mode enregistré ou null si absent.
   */
  getMode () {
    const mode = localStorage.getItem('mode')
    return mode ? JSON.parse(mode) : null
  },

  /**
   * Définit la langue (ex : "fr", "en") et la stocke dans localStorage.
   * Déclenche ensuite un événement "lang-changed" pour actualiser l’UI.
   *
   * @param {string} value - Le code de langue sélectionné.
   */
  setLanguage (value) {
  // Stockage brut au format JSON
    localStorage.setItem('lang', JSON.stringify(value))

    // Notification globale envoyée à l'application
    window.dispatchEvent(
      new CustomEvent('lang-changed', {
        detail: { storage: localStorage.getItem('lang') },
      }),
    )
  },

  /**
   * Récupère la langue stockée dans localStorage.
   *
   * @returns {string|null} - Le code langue enregistré ou null.
   */
  getLanguage () {
    const lang = localStorage.getItem('lang')
    return lang ? JSON.parse(lang) : null
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
  setEvent (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1, // Durée de validité
    }

    // Sauvegarde en localStorage
    localStorage.setItem('event', JSON.stringify(payload))

    // Notifie l'application d'un changement
    window.dispatchEvent(
      new CustomEvent('event-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère l'événement principal.
   *
   * @returns {any|null} - Les données ou null si expirées / inexistantes.
   */
  getEvent () {
    const raw = localStorage.getItem('event')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    // Vérifie l'expiration
    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('event')
      return null
    }

    return payload.data
  },

  /**
   * Stocke le tag d'événement avec expiration.
   *
   * @param {any} value - Tag à enregistrer.
   */
  setTag (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('tag', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('tag-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère le tag stocké.
   *
   * @returns {any|null} - Le tag ou null si expiré.
   */
  getTag () {
    const raw = localStorage.getItem('tag')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('tag')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les événements les mieux notés.
   *
   * @param {any} value - Données d'événements.
   */
  setHightRateEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('HightEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('HightEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les événements les mieux notés.
   *
   * @returns {any|null}
   */
  getHightRateEvents () {
    const raw = localStorage.getItem('HightEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('HightEvent')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les événements les mieux notés (version actuelle).
   */
  setActualHightRateEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('ActualHightEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('ActualHightEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les événements "meilleur taux" actuels.
   */
  getActualHightRateEvents () {
    const raw = localStorage.getItem('ActualHightEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('ActualHightEvent')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les nouveaux événements.
   */
  setNewEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('NewEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('NewEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les nouveaux événements.
   */
  getNewEvents () {
    const raw = localStorage.getItem('NewEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('NewEvent')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les nouveaux événements actuels.
   */
  setActualNewEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('ActualNewEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('ActualNewEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les nouveaux événements actuels.
   */
  getActualNewEvents () {
    const raw = localStorage.getItem('ActualNewEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('ActualNewEvent')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les événements à venir.
   */
  setUpcomingEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('UpcomingEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('UpcomingEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les événements à venir.
   */
  getUpcomingEvents () {
    const raw = localStorage.getItem('UpcomingEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('UpcomingEvent')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les événements à venir actuels.
   */
  setActualUpcomingEvents (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t1,
    }

    localStorage.setItem('ActualUpcomingEvent', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('ActualUpcomingEvent-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les événements à venir actuels.
   */
  getActualUpcomingEvents () {
    const raw = localStorage.getItem('ActualUpcomingEvent')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('ActualUpcomingEvent')
      return null
    }

    return payload.data
  },

  /** --------------------------
   * SECTION : AUTHENTIFICATION
   * -------------------------- */

  /**
   * Stocke l'état de connexion "login" avec expiration automatique.
   * @param {Boolean} value - Valeur du login (true = connecté, false = déconnecté)
   */
  setlogin (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t3, // Durée de validité
    }

    localStorage.setItem('login', JSON.stringify(payload))

    // Notifie toute l’app que le login a changé
    window.dispatchEvent(
      new CustomEvent('login-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère l'état de connexion (login).
   * Retourne null si la donnée est expirée ou absente.
   */
  getlogin () {
    const raw = localStorage.getItem('login')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    // Si expiré → suppression automatique
    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('login')
      return null
    }

    return payload.data
  },

  /**
   * Stocke les données de l'utilisateur connecté (logUser).
   * @param {*} value - Toute donnée utile sur l’utilisateur (token, profil…)
   */
  setLogUser (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t3,
    }

    localStorage.setItem('logUserr', JSON.stringify(payload))

    // Émission d’un événement de synchronisation
    window.dispatchEvent(
      new CustomEvent('logUserr-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les données utilisateur (logUser).
   * Retourne null si expiré ou absent.
   */
  getLogUser () {
    const raw = localStorage.getItem('logUserr')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('logUserr')
      return null
    }

    return payload.data
  },

  /** --------------------------
   * SECTION : ORGANISATEUR
   * -------------------------- */

  /**
   * Stocke les données de l'organisateur avec expiration automatique.
   */
  setOrganisator (value) {
    const now = Date.now()

    const payload = {
      data: value,
      expiresAt: now + LocalStorageManager.t3,
    }

    localStorage.setItem('organisator', JSON.stringify(payload))

    window.dispatchEvent(
      new CustomEvent('organisator-changed', {
        detail: { storage: payload },
      }),
    )
  },

  /**
   * Récupère les données de l’organisateur.
   * Supprime la donnée si expirée.
   */
  getOrganisator () {
    const raw = localStorage.getItem('organisator')
    if (!raw) {
      return null
    }

    const payload = JSON.parse(raw)

    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem('organisator')
      return null
    }

    return payload.data
  },

  /** --------------------------
   * SECTION : UTILITAIRES
   * -------------------------- */

  /**
   * Change la valeur du mode (toggle si aucun argument).
   * @param {Boolean} [value] - Nouvelle valeur du mode
   * @returns {Boolean} - Mode final appliqué
   */
  changeMode (value) {
    const actualMode
    = typeof value === 'boolean' ? value : !LocalStorageManager.getMode()

    LocalStorageManager.setMode(actualMode)
    return actualMode
  },

  /**
   * Change la valeur de la langue (toggle si aucun argument).
   * @param {Boolean} [value] - Nouvelle valeur du langage
   * @returns {Boolean} - Langue finale appliquée
   */
  changeLanguage (value) {
    const actualLang
    = typeof value === 'boolean' ? value : !LocalStorageManager.getLanguage()

    LocalStorageManager.setLanguage(actualLang)
    return actualLang
  },

  /**
   * Déconnecte complètement l'utilisateur :
   * - login = false
   * - données user = null
   */
  logout () {
    LocalStorageManager.setLogin(false)
    LocalStorageManager.setLogUser(null)
    return LocalStorageManager.getLogin()
  },

  /**
   * Connecte l’utilisateur en définissant :
   * - logUser (profil utilisateur)
   * - login = true
   */
  login (user) {
    LocalStorageManager.setLogUser(user)
    LocalStorageManager.setLogin(true)
    return LocalStorageManager.getLogin()
  },

}

export default LocalStorageManager
