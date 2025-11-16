<template>
    <div id="profileHeaderComponent">

        <div v-if="!himself" :class="['first', { 'middleAvatar': !himself }]">
            <v-avatar size="180">
                <img alt="John" :src="userAvatar" />
            </v-avatar>
        </div>

        <div v-else :class="['first', { 'middleAvatar': !himself }]">
            <v-avatar size="180">
                <img alt="Meeee" :src="user?.avatar" />
            </v-avatar>
        </div>

       
        

        <div class="middle" v-if="!himself">
            <h2>{{ user?.username }}</h2>
            <p>{{ user?.description }}</p>
        </div>

        <div class="middle" v-if="himself">
            <h2>{{ user?.username }}</h2>
            <p>{{ user?.description }}</p>
        </div>

        <div class="last" v-show="himself">
            <router-link to="/GestionProfile" class="router">
                <v-icon
                    icon="mdi-account-edit"
                    class="iconHead"
                    :title="actualLang ? 'Manage your account' : 'Gerer votre compte'"
                />
            </router-link>

            <v-icon 
                icon="mdi-logout"
                class="iconHead"
                @click="Logout()"
                :title="actualLang ? 'Logout' : 'Se deconnecter'"
            />
        </div>

        <div class="fourth" @click="showWindow()">
             <v-icon icon="mdi-account-group" class="iconHead" :title="actualLang ? 'Social' : 'Se deconnecter'" />
        </div>

        <ProfileUserStatutComponent v-show="isShowAdd2" @pop="showWindow()" />

    </div>
</template>

  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted, defineProps, computed} from "vue";
    import { useAuthStore } from "@/stores/auth";
    import { getAvatarUrl } from "@/JS/GlobalFunctions";
    import ProfileUserStatutComponent from "./ProfileUserStatutComponent.vue";

    const props = defineProps({
        himself: Boolean, 
        user: Object
    });

    const userAvatar = computed(() => {
    return getAvatarUrl(props.user?.avatar);
});

    let isShowAdd2 = ref(false);

    const showWindow = () => {
        isShowAdd2.value = !isShowAdd2.value;
    }




    const {logout} = useAuthStore();

    storageManager.setLogUser(props.user);
    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    


    const Logout = () => {
        logout();
        storageManager.setLogin(false);
        //localStorage.removeItem('logUser');
        isLogged.value = storageManager.getLogin();
    }
    if(props.user === null){
        //Logout()
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