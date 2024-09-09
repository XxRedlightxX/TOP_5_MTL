<template>
    <v-app-bar :elevation="2"  id="menuComponent">

        <div :class="['allMenu', {'burgerLinks' : seeBurgermenu}]" >
            <router-link  to="/" class="logo">
                <img src="/src/assets/Logo-Gem.svg" alt="Logo Gem" title="Go to Home Page">
            </router-link>
            
            <div class="links">
                <router-link to="/" :class="{'glow' : !actualMode}">Home</router-link>
                <router-link to="/Events" :class="{'glow' : !actualMode}">Events</router-link>
            </div>

            <div class="icons">
                <router-link to="/Profile" class="profile">
                    <v-icon icon="mdi-account-circle" class="icon" :class="{'glow' : !actualMode}"/>
                </router-link>
                <v-icon :icon="!actualMode ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent'" :class="['icon', {'justGlow' : !actualMode}]" @click="changeMode()"/>
            </div>
        </div>

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
    import { ref } from 'vue'

    let actualMode = ref(storageManager.getMode());
    let seeBurgermenu = ref(false);

    if (actualMode.value === null) {
        storageManager.setMode(true);
        actualMode.value = storageManager.getMode();
    }

    const changeMode = () => {
        console.log("new val = " + !actualMode.value)
        storageManager.setMode(!actualMode.value);
        actualMode.value = !actualMode.value
    }
</script>

<style src="../styles/MenuComponentStyle.scss"></style>