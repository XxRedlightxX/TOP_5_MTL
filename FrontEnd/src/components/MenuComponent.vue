<template>
    <v-app-bar :elevation="2"  id="menuComponent">
        
        <transition name="slide">
        <div v-if="seeBurgermenu" :class="['allMenu', {'burgerLinks' : seeBurgermenu}]" @click.self="changeSeeBurgermenu()">
            <div class="smallMenu">
                <v-icon icon="mdi-window-close" :class="['icon', 'iconClose', {'justGlow' : !actualMode}]" @click="changeSeeBurgermenu()"/>
                <!--<router-link  to="/" class="logo">
                    <img src="/src/assets/Logo-Gem.svg" alt="Logo Gem" title="Go to Home Page">
                </router-link>-->
                <Logo title="Go to Home Page" /> 
                
                <div class="links">
                    <router-link to="/" :class="{'glow' : !actualMode}">Home</router-link>
                    <router-link to="/Events" :class="{'glow' : !actualMode}">Events</router-link>
                    <router-link to="/Login">Login Test</router-link>
                </div>
                <div class="icons">
                    <router-link to="/Profile" class="profile">
                        <v-icon icon="mdi-account-circle" class="icon" :class="{'glow' : !actualMode}"/>
                    </router-link>
                    <v-icon :icon="!actualMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" :class="['icon', {'justGlow' : !actualMode}]" @click="changeMode()"/>
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
    import { ref } from 'vue'

    let actualMode = ref(storageManager.getMode());
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
</script>

<style src="../styles/MenuComponentStyle.scss"></style>