<template>
    <div id="profileListEventComponent">
        <div class="head  glass">
            <h4>Header text</h4>
            <v-icon icon="mdi-plus-box-multiple" :class="['icon', {'justGlowless' : !actualMode}]"/>
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .head {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 0% 1.6% 0% 0%;

            h4 {
                flex: 1;
                color: var(--graphite08);
                font-size: 2rem;
            }

            .icon {
                padding: 2% 4%;
                color: var(--graphite06);
                font-size: 3.2rem;
            }
            .icon:hover {
                cursor: pointer;
                color: var(--graphite);
            }
        }

        .body {
            flex: 1;
            margin-top: 1%;
            padding: 0% 1% 0% 0%;
            
            max-height: 500px;
            overflow: auto;
            scrollbar-width: thin;
            scrollbar-color: var(--graphite015) rgba(255, 255, 255, 0.06);

            #profileSingleEventComponent {
                margin-bottom: 2%;
            }
        }
    }
</style>