const StorageManager = {
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
    }
  };
  export default StorageManager;