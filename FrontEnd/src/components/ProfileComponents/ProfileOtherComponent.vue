<template>
    <div id="profileOtherComponent">
        <h1>Profile other</h1>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps} from "vue";

    const props = defineProps({
        himself: Boolean, // Boolean type prop
        user: Object
    });

    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

    const Logout = () => {
        storageManager.setLogin(false);
        isLogged.value = storageManager.getLogin();
    }

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    if (isLogged.value === null) {
        Logout();
    }


    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
        // Function to handle mode change event
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('login-changed', handleLoginChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('login-changed', handleLoginChange);
    });
</script>

<style lang="scss">
    #profileOtherComponent {
        width: 100%;
        height: 100%;
        padding: 8% 0%;
        
        h1 {
            color: var(--graphite08);
        }
    }

    .light {
        #profileOtherComponent {
            
            h1 {
                color: var(--graphite08);
            }
        }
    }

    .dark {
        #profileOtherComponent {
            
            h1 {
                color: var(--light-trans-text);
            }
        }
    }
</style>