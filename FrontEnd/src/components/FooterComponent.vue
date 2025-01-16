<template>
    <div id="footerComponent">
        <div class="waveContainer">
            <svg
            class="waves"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shape-rendering="auto"
            >
            <defs>
                <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
            </defs>
            <g class="parallax">
                <use
                xlink:href="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(192,188,188, 0.3)"
                />
                <use
                xlink:href="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(192,188,188, 0.5)"
                />
                <use
                xlink:href="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(192,188,188, 0.8)"
                />
                <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(192,188,188, 1)" />
            </g>
            </svg>
        </div>
        <div class="links">
            <router-link to="/" :title="actualLang ? 'Go to Home Page' : 'Allez a la page d\'accueil'">{{actualLang ? 'Home' : 'Accueil'}}</router-link>
            <router-link to="/Events" :title="actualLang ? 'Go to Event Page' : 'Allez a la page d\'aEvenement'">{{actualLang ? 'Events' : 'Evenement'}}</router-link>
            <router-link to="/Profile" :title="actualLang ? 'Go to Profile Page' : 'Allez a la page Profile'">{{actualLang ? 'Profile' : 'Profile'}}</router-link>
        </div>

        <p>&copy Debraise et le touriste</p>
    </div>
</template>

<script setup>
    import storageManager from "@/JS/LocalStaorageManager"
    import { ref, onMounted, onUnmounted} from "vue";

    let actualLang = ref(storageManager.getLang());

    if (actualLang.value === null) {
        storageManager.setLang(true);
        actualLang.value = storageManager.getLang();
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

<style src="../styles/FooterComponentStyle.scss"></style>