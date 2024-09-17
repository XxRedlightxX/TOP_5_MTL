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
    }
  };
  export default StorageManager;