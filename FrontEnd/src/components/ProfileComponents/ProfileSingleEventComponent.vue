<template>
    <div id="profileSingleEventComponent" class="glass">
        <div class="first">
            <img :src="props.event.image" alt="#">
        </div>

        <div class="middle">
            {{ props.event.id }}
            <h2>{{ props.event.title }}</h2>

            <p>{{ props.event.desc }}</p>

            

        </div>

        <div class="last"  v-show="props.himself">
            <v-icon icon="mdi-folder-edit" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Edit this Event' : 'Modifier cet evenement'" @click="showUp()"/>
            <v-icon icon="mdi-delete-circle" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Delette this Event' : 'Supprimer cet evenement'" @click="showDel()"/>
        </div>

    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, defineEmits } from "vue";


    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let actualMode = ref(storageManager.getMode());
    let activityId = ref(null);

    const emit = defineEmits(['popUpdate', 'popDelete'])

    
    //var isShowUp = ref(false);
    const props = defineProps({
        event: Object, // Boolean type prop
        himself: Boolean, // Boolean type prop
    });
    activityId.value =props.event.id
    console.log(activityId.value)

    // Définir les événements émis par ce composant
    const emit = defineEmits(['popUpdate']);

    const showUp = () => {
        emit('popUpdate');
    }

    const showDel = () => {
        emit('popDelete');
    }
    //console.log('props : ', props.event)
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
    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }


    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
        // Function to handle mode change event
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };
    const handleModeChange = (event) => {
        actualMode.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('login-changed', handleLoginChange);
        window.addEventListener('mode-changed', handleModeChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('login-changed', handleLoginChange);
        window.removeEventListener('mode-changed', handleModeChange);
    });
</script>

<style src="../../styles/ProfilesStyles/profileSingleEventComponentStyle.scss"></style>