<template>
    <div id="profileListEventComponent">
        <div class="head">
            <h4>Header text</h4>
            <button @click="Logout()">Logout</button>
        </div>

        <div class="body">
            <ProfileSingleEvent/>
            <ProfileSingleEvent/>
            <ProfileSingleEvent/>
            <ProfileSingleEvent/>
            <ProfileSingleEvent/>
        </div>
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";
    import ProfileSingleEvent from "./ProfileSingleEventComponent.vue"

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
    #profileListEventComponent {
        border: 2px solid red;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .head {
            border: 2px solid rgb(10, 219, 111);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            h4 {
                flex: 4;
                border: 2px solid black;
                color: black;
                font-size: 2rem;
            }

            button {
                flex: 1;
                border: 2px solid black;
                background-color: rgba(244, 0, 0, 0.5);
                padding: 1% 2%;
                color: black;
                font-weight: bold;
            }
            button:hover {
                background-color: rgba(255, 0, 0, 0.3);
            }
        }

        .body {
            flex: 1;
            border: 2px solid rgb(10, 21, 222);
            padding: 1% 1%;
            
            max-height: 320px;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--graphite015) rgba(255, 255, 255, 0.06);

            #profileSingleEventComponent {
                margin-top: 2%;
            }
        }
    }
</style>