<template>
    <v-app-bar :elevation="2"  id="menuComponent">
        
        <transition name="slide">
        <div v-if="seeBurgermenu" :class="['allMenu', {'burgerLinks' : seeBurgermenu}]" @click.self="changeSeeBurgermenu()">
            <div class="smallMenu">
                <v-icon icon="mdi-window-close" :class="['icon', 'iconClose', {'justGlow' : !actualMode}]" @click="changeSeeBurgermenu()"/>
                <!--<router-link  to="/" class="logo">
                    <img src="/src/assets/Logo-Gem.svg" alt="Logo Gem" title="Go to Home Page">
                </router-link>-->
                <Logo2 :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'" /> 
                
                <div class="links">
                    <router-link to="/" :class="{'glow' : !actualMode}" :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'">{{actualLang ? 'Home' : 'Accueil'}}</router-link>
                    <router-link to="/Events" :class="{'glow' : !actualMode}" :title="actualLang ? 'Go to Event Page' : 'Allez a la page d\'aEvenement'">{{actualLang ? 'Events' : 'Evenement'}}</router-link>
                </div>
                <div class="icons">
                    <router-link to="/Profile" class="profile" :title="actualLang ? 'Go to Profile Page' : 'Allez a la page Profile'">
                        <v-icon icon="mdi-account-circle" class="icon" :class="{'glow' : !actualMode}"/>
                    </router-link>
                    <v-icon 
                        :icon="!actualMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" 
                        :class="['icon', 'iconn', { 'justGlow': !actualMode }]" 
                        @click="changeMode()" 
                        :title="actualLang ? (actualMode ? 'Go to Night Mode' : 'Go to Light Mode') : (actualMode ? 'Passez en mode Nuit' : 'Passez en mode Jour')"
                        />

                </div>
            </div>
        </div>
        </transition>

        <div class="BurgerMenu">
                <input type="checkbox" name="showMenu" id="showMenu" v-model="seeBurgermenu">
                <label for="showMenu">
                    <v-icon icon="mdi-menu" :class="['icon', {'justGlow' : !actualMode}]" @click="console.log(seeBurgermenu)"/>
                </label>
            </div>
    </v-app-bar>
</template>

<script setup>
    import storageManager from "../JS/LocalStaorageManager.js"
    import Logo from "../components/LogoComponent.vue"
    import Logo2 from "../components/Logo2Component.vue"
    import { ref, onMounted, onUnmounted } from 'vue'

    let actualMode = ref(storageManager.getMode());
    let actualLang = ref(storageManager.getLang());
    let seeBurgermenu = ref(true);

    function getDeviceDimensions() {
        // Obtenir la largeur et la hauteur de la fenêtre
        var width = window.innerWidth;
        var height = window.innerHeight;
        
        // Retourner un objet avec les dimensions
        return {
            width: width,
            height: height
        };
    }
    const dimensions = getDeviceDimensions();

    if (dimensions.width <= 1025){
        seeBurgermenu.value = false
    }
    
    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
    }

    const changeMode = () => {
        console.log("new val = " + !actualMode.value)
        storageManager.setMode(!actualMode.value);
        actualMode.value = !actualMode.value
    }

    const changeSeeBurgermenu = () => {
        //const dimensions = getDeviceDimensions(); // Appel de la fonction
        console.log("click : " + dimensions.width); // Utilisation de la valeur retournée
        if (dimensions.width <= 1025) { // Vérification de la largeur
            seeBurgermenu.value = !seeBurgermenu.value;
        }
    }

        // Function to handle mode change event
        const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };
    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
    });
</script>

<style src="../styles/MenuComponentStyle.scss"></style>