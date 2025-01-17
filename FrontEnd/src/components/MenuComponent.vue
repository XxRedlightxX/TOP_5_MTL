<template>
    <v-app-bar :elevation="2"  id="menuComponent">
        
        <transition name="slide">
        <div v-if="seeBurgermenu" :class="['allMenu', {'burgerLinks' : seeBurgermenu}]" @click.self="changeSeeBurgermenu()">
            <div class="smallMenu">
                <v-icon icon="mdi-window-close" :class="['icon', 'iconClose', {'justGlow' : !actualMode}]" @click="changeSeeBurgermenu()"/>
                <Logo :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'" :size="0" class="logoo"/> 
                
                <div class="links">
                    <router-link to="/" :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'">{{actualLang ? 'Home' : 'Accueil'}}</router-link>
                    <router-link to="/Events" :title="actualLang ? 'Go to Event Page' : 'Allez a la page d\'aEvenement'">{{actualLang ? 'Events' : 'Evenement'}}</router-link>
                </div>
                <div class="icons">
                    <router-link to="/Profile" class="profile" :title="actualLang ? 'Go to Profile Page' : 'Allez a la page Profile'">
                        <v-icon icon="mdi-account-circle" class="icon"/>
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
    import Logo from "../components/Logos/Logo3Component.vue"
    import { ref, onMounted, onUnmounted, watch } from 'vue'

    let actualMode = ref(storageManager.getMode());
    let actualLang = ref(storageManager.getLang());
    var lastScrollTop = 0;
    let seeBurgermenu = ref(true);
    const width = ref(window.innerWidth);
    const height = ref(window.innerHeight);

    // Fonction pour mettre à jour les dimensions de la fenêtre
    function updateDimensions() {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
    }

    // Écouteur pour surveiller les changements de largeur
    watch(width, (newVal) => {
      if (newVal >= 1026) {
        seeBurgermenu.value = true;
        console.log('Retour plein écran :', newVal);
      }
    });

    if (width.value <= 1025){
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
        console.log("click : " + width.value); // Utilisation de la valeur retournée
        if (width.value <= 1025) { // Vérification de la largeur
            seeBurgermenu.value = !seeBurgermenu.value;
        }
    }

        // Function to handle mode change event
        const handleLangChange = (event) => {
        actualLang.value = JSON.parse(event.detail.storage);
    };


    const handleScroll = () => {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        console.log("scroll : ", scrollTop)
        if (scrollTop > lastScrollTop) {
            document.querySelector('#menuComponent').style.top = "-80px"; // Hide the navbar on scroll down
            if(width.value <=1025){
                let newHeight = height.value + 80;
                document.querySelector('.smallMenu').style.height = newHeight+"px";
                document.querySelector('.icons').style.marginBottom = "0px"; 
            }

        } else {
            document.querySelector('#menuComponent').style.top = "0px"; // Show the navbar on scroll up
            if(width.value <=1025){
                document.querySelector('.smallMenu').style.height = "107%"; 
                document.querySelector('.icons').style.marginBottom = "65px"; 
            }
        }
        lastScrollTop = scrollTop;
    };

    // Add event listener for mode changes
    onMounted(() => {
        window.addEventListener('lang-changed', handleLangChange);
        window.addEventListener("scroll", handleScroll);
        window.addEventListener('resize', updateDimensions);
    });

    // Remove event listener when component is unmounted
    onUnmounted(() => {
        window.removeEventListener('lang-changed', handleLangChange);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener('resize', updateDimensions);
    });

</script>

<style src="../styles/MenuComponentStyle.scss"></style>