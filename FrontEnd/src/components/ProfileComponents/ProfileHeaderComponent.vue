<template>
    <div id="profileHeaderComponent">
        <div :class="['first', { 'middleAvatar': !props.himself }]">
            <v-avatar size="180">
                <img
                    alt="John"
                    :src="props.user.avatar"
                />
            </v-avatar>
        </div>
        <div class="middle">
            <h2>{{ props.user.username }}</h2>

            <p>{{ props.user.desc }}</p>
        </div>

        <div class="last"  v-show="props.himself">
            <router-link to="/Gestion Profile" class="router">
                <v-icon icon="mdi-account-edit" :class="['iconHead', {'glowLess' : !actualMode}]" :title="actualLang ? 'Manage your account' : 'Gerer votre compte'"/>
            </router-link>
            <v-icon icon="mdi-logout" :class="['iconHead', {'glowLess' : !actualMode}]" @click="Logout()" :title="actualLang ? 'Logout' : 'Se deconnecter'"/>

        </div>
        
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

<style src="../../styles/ProfilesStyles/profileHeaderComponentStyle.scss"></style>