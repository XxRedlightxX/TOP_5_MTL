<template>
    <div id="profileSingleEventComponent" class="glass">
        <div class="first">
            <img :src="props.event.image" alt="#">
        </div>

        <div class="middle">
            
            <h2>{{ props.event.title }}</h2>

            <p>{{ props.event.desc }}</p>

        </div>

        <div class="last"  v-show="props.himself">
            <router-link to="/Gestion Event" class="router">
                <v-icon icon="mdi-folder-edit" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Edit this Event' : 'Modifier cet evenement'"/>
            </router-link>
            <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Delette this Event' : 'Supprimer cet evenement'"/>
        </div>

    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps} from "vue";


    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());

    const props = defineProps({
        event: Object, // Boolean type prop
        himself: Boolean, // Boolean type prop
    });

    console.log('props : ', props.event)
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

<style src="../../styles/ProfilesStyles/profileSingleEventComponentStyle.scss"></style>