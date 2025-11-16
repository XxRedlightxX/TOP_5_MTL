const StorageManager = {
  // gere le mode dark-light
 setMode(value) {
    const modeValue = value === true || value === 'days' ? 'days' : 'nights';
    localStorage.setItem("mode", modeValue);
    window.dispatchEvent(
      new CustomEvent("mode-changed", {
        detail: { storage: modeValue }, // This is a string
      })
    );
  },
  
  getMode() {
    return localStorage.getItem("mode") || 'days'; // Return string directly
  },


  setUserList(value) {
    localStorage.setItem("List", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("userlist-changed", {
        detail: {
          storage: localStorage.getItem("List"),
        },
      })
    );
  },

  getUserList() {
    const list = localStorage.getItem("List");
    return list ? JSON.parse(list) : [];
  },

  // gere les event a afficher a la page single event
  setEvent(value) {
    localStorage.setItem("event", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("event-changed", {
        detail: {
          storage: localStorage.getItem("event"),
        },
      })
    );
  },
  getEvent() {
    const event = localStorage.getItem("event");
    return event ? JSON.parse(event) : null;
  },

  // gere la langue a afficher
  setLang(value) {
    localStorage.setItem("lang", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("lang-changed", {
        detail: {
          storage: localStorage.getItem("lang"),
        },
      })
    );
  },
  getLang() {
    const lang = localStorage.getItem("lang");
    return lang ? JSON.parse(lang) : null;
  },

  // gere la connection
  setLogin(value) {
    localStorage.setItem("login", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("login-changed", {
        detail: {
          storage: localStorage.getItem("login"),
        },
      })
    );
  },
  getLogin() {
    const login = localStorage.getItem("login");
    return login ? JSON.parse(login) : null;
  },

  // gere l'utilisateur a afficher
  setLogUser(value) {
    localStorage.setItem("logUserr", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("logUserr-changed", {
        detail: {
          storage: localStorage.getItem("logUserr"),
        },
      })
    );
  },
  getLogUser() {
    const logUser = localStorage.getItem("logUserr");

    if (!logUser || logUser === "undefined" || logUser === "null") {
        return null;
    }

    try {
        return JSON.parse(logUser);
    } catch (e) {
        console.error("Corrupted logUser value:", logUser);
        return null;
    }
  },

  // gere l'organisateur a afficher
  setOrganisator(value) {
    localStorage.setItem("organisator", JSON.stringify(value));
    window.dispatchEvent(
      new CustomEvent("organisator-changed", {
        detail: {
          storage: localStorage.getItem("organisator"),
        },
      })
    );
  },
  getOrganisator() {
    const organisator = localStorage.getItem("organisator");
    return organisator ? JSON.parse(organisator) : null;
  },
};
export default StorageManager;
