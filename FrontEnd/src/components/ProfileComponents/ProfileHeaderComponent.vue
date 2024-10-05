<template>
    <div id="profileHeaderComponent">
        <div class="first">
            <v-avatar size="180">
                <img
                    alt="John"
                    :src="theOrganisator.avatar"
                />
            </v-avatar>
        </div>
        <div class="middle">
            <h2>{{ theOrganisator.username }}</h2>

            <p>{{ theOrganisator.desc }}</p>
        </div>

        <div class="last">
            <router-link to="/Gestion Profile" class="router">
                <v-icon icon="mdi-account-edit" :class="['icon', {'glowLess' : !actualMode}]" :title="actualLang ? 'Manage your account' : 'Gerer votre compte'"/>
            </router-link>
            <v-icon icon="mdi-logout" :class="['icon', {'glowLess' : !actualMode}]" @click="Logout()" :title="actualLang ? 'Logout' : 'Se deconnecter'"/>

        </div>
        
    </div>
  </template>
  
<script setup>
    import storageManager from "@/JS/LocalStaorageManager";
    import { ref, onMounted, onUnmounted} from "vue";

    const text = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel nemo laborum ipsum aspernatur mollitia minima quo voluptates repudiandae eum, possimus neque, sapiente nesciunt dolor pariatur veritatis reprehenderit omnis, voluptatum eaque.";
    const organisator = {
        avatar: "/src/assets/p1.jpg",
        username: "Debrazer",
        desc: text,
        listEvent: [
            { image: "/src/assets/HomeCarousel/Mont-royal.jpg", title: "Mont-Royal", desc: text, rating: 1 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 },
            { image: "/src/assets/HomeCarousel/LaRonde.jpg", title: "Laronde", desc: text, rating: 5 },
            { image: "/src/assets/HomeCarousel/Jardin-botanique.jpg", title: "Jardin Botanique", desc: text, rating: 4 },
            { image: "/src/assets/HomeCarousel/Vieux-port.jpg", title: "Vieux-Port", desc: text, rating: 3 }
        ]
    };

    let actualLang = ref(storageManager.getLang());
    let isLogged = ref(storageManager.getLogin());
    let theOrganisator = ref(storageManager.getOrganisator());

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
  
    if (theOrganisator.value === null) {
        theOrganisator.value = organisator;
    }


    // Function to handle mode change event
    const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Function to handle mode change event
    const handleLoginChange = (event) => {
        isLogged.value = JSON.parse(event.detail.storage);
    };  
    // Function to handle mode change event
    const handleOrganisatorChange = (event) => {
        theOrganisator.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener('login-changed', handleLoginChange);
        window.addEventListener('organisator-changed', handleOrganisatorChange);
    });
    
    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener('login-changed', handleLoginChange);
        window.removeEventListener('organisator-changed', handleOrganisatorChange);
    });
</script>

<style src="../../styles/ProfilesStyles/profileHeaderComponentStyle.scss"></style>