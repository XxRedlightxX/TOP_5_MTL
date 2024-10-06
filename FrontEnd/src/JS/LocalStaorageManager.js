const StorageManager = {

    // gere le mode dark-light
    setMode(value) {
        localStorage.setItem("mode", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('mode-changed', {
            detail: {
                storage: localStorage.getItem('mode')
            }
        }));
    },
    getMode() {
        const mode = localStorage.getItem("mode");
        return mode ? JSON.parse(mode) : null;
    },

    // gere les event a afficher a la page single event
    setEvent(value) {
        localStorage.setItem("event", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('event-changed', {
            detail: {
                storage: localStorage.getItem('event')
            }
        }));
    },
    getEvent() {
        const event = localStorage.getItem("event");
        return event ? JSON.parse(event) : null;
    },

    // gere la langue a afficher
    setLang(value) {
        localStorage.setItem("lang", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('lang-changed', {
            detail: {
                storage: localStorage.getItem('lang')
            }
        }));
    },
    getLang() {
        const lang = localStorage.getItem("lang");
        return lang ? JSON.parse(lang) : null;
    },

    // gere la connection
    setLogin(value) {
        localStorage.setItem("login", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('login-changed', {
            detail: {
                storage: localStorage.getItem('login')
            }
        }));
    },
    getLogin() {
        const login = localStorage.getItem("login");
        return login ? JSON.parse(login) : null;
    },


    // gere l'utilisateur a afficher
    setLogUser(value) {
        localStorage.setItem("logUser", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('logUser-changed', {
            detail: {
                storage: localStorage.getItem('logUser')
            }
        }));
    },
    getLogUser() {
        const logUser = localStorage.getItem("logUser");
        return logUser ? JSON.parse(logUser) : null;
    },

    // gere l'organisateur a afficher
    setOrganisator(value) {
        localStorage.setItem("organisator", JSON.stringify(value));
        window.dispatchEvent(new CustomEvent('organisator-changed', {
            detail: {
                storage: localStorage.getItem('organisator')
            }
        }));
    },
    getOrganisator() {
        const organisator = localStorage.getItem("organisator");
        return organisator ? JSON.parse(organisator) : null;
    }
  };
  export default StorageManager;